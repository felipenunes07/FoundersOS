import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const PARTICLE_COUNT = 10500;
const NETWORK_SAMPLE = 580;

function rand(seed) {
  let value = seed + 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function mixColor(start, end, amount) {
  return new THREE.Color(
    start.r + (end.r - start.r) * amount,
    start.g + (end.g - start.g) * amount,
    start.b + (end.b - start.b) * amount,
  );
}

function brainColor(horizontal) {
  const deep = new THREE.Color("#035e36");
  const middle = new THREE.Color("#078f51");
  const bright = new THREE.Color("#28d982");
  if (horizontal <= 0.5) return mixColor(deep, middle, horizontal * 2);
  return mixColor(middle, bright, (horizontal - 0.5) * 2);
}

function buildBrainTargets() {
  const size = 1180;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];

  context.fillStyle = "#fff";
  context.fillRect(0, 0, size, size);
  context.font = `${Math.round(size * 0.81)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("🧠", size / 2, size / 2 + size * 0.03);

  const data = context.getImageData(0, 0, size, size).data;
  const pixelSum = (x, y) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return 765;
    const index = (y * size + x) * 4;
    return data[index] + data[index + 1] + data[index + 2];
  };
  const isBackground = (x, y) => pixelSum(x, y) > 690;
  const candidates = [];
  const stride = 2;

  for (let y = 0; y < size; y += stride) {
    for (let x = 0; x < size; x += stride) {
      if (isBackground(x, y)) continue;

      const silhouette =
        isBackground(x - stride, y) ||
        isBackground(x + stride, y) ||
        isBackground(x, y - stride) ||
        isBackground(x, y + stride);
      const local = pixelSum(x, y);
      const detail =
        Math.max(
          Math.abs(pixelSum(x - 3, y) - local),
          Math.abs(pixelSum(x + 3, y) - local),
          Math.abs(pixelSum(x, y - 3) - local),
          Math.abs(pixelSum(x, y + 3) - local),
          Math.abs(pixelSum(x - 9, y) - local),
          Math.abs(pixelSum(x + 9, y) - local),
        ) > 82;

      if (!silhouette && !detail) continue;
      candidates.push({
        x: ((x - size / 2) / (size * 0.42)) * 1.55,
        y: -((y - size / 2) / (size * 0.42)) * 1.55,
        edge: silhouette,
      });
    }
  }

  return candidates;
}

function createBrainGeometry(targets) {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  let maxX = 0;
  targets.forEach((target) => {
    maxX = Math.max(maxX, Math.abs(target.x));
  });
  maxX = Math.max(maxX, 1);

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const seed = index * 1000 + 1;
    const target = targets[Math.floor(rand(seed + 11) * targets.length)];
    const jitter = target.edge ? 0.014 : 0.022;
    const x = target.x + (rand(seed + 12) - 0.5) * jitter;
    const y = target.y + (rand(seed + 13) - 0.5) * jitter;
    const depthEnvelope = 0.36 - Math.min(0.13, Math.abs(x) * 0.035);
    const z = (rand(seed + 14) - 0.5) * depthEnvelope;
    const horizontal = Math.max(0, Math.min(1, (x + maxX) / (2 * maxX)));
    const color = brainColor(horizontal);

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return { geometry, positions };
}

/* Movimento do brain do Ben AI (app/benai.html): ordem radial a partir do
   centro de massa, cada partícula com sua janela de migração de 30% escalonada
   pelo raio — o miolo fecha primeiro, a silhueta por último. Só as posições
   mudam; material, cor, tamanho e densidade continuam os do original. */
const ASSEMBLE_MS = 2800;
const ORDER_MAX = 0.7;
const MIGRATION_DURATION = 0.3;

function createAssembly(positions) {
  const scatter = new Float32Array(positions.length);
  const order = new Float32Array(PARTICLE_COUNT);

  /* Elipse com miolo vazio, inteira DENTRO do frame: a meia-altura visível é
     tan(19°)*5.35 = 1.84, e qualquer coisa além disso é cortada em reta e
     aparece como quadrado. */
  const HOLLOW = 1.05;
  const SPAN_X = 1.74;
  const SPAN_Y = 1.52;
  const SPAN_Z = 1.3;

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const seed = index * 7 + 3;
    const angle = rand(seed + 1) * Math.PI * 2;
    const reach = Math.sqrt(rand(seed + 2));

    scatter[index * 3] = Math.cos(angle) * (HOLLOW + reach * (SPAN_X - HOLLOW));
    scatter[index * 3 + 1] =
      Math.sin(angle) * (HOLLOW + reach * (SPAN_Y - HOLLOW));
    scatter[index * 3 + 2] = (rand(seed + 3) * 2 - 1) * SPAN_Z;
  }

  let centerX = 0;
  let centerY = 0;
  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    centerX += positions[index * 3];
    centerY += positions[index * 3 + 1];
  }
  centerX /= PARTICLE_COUNT;
  centerY /= PARTICLE_COUNT;

  const ranked = new Array(PARTICLE_COUNT);
  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    ranked[index] = {
      index,
      score: Math.hypot(
        positions[index * 3] - centerX,
        positions[index * 3 + 1] - centerY,
      ),
    };
  }
  ranked.sort((a, b) => a.score - b.score);
  for (let rank = 0; rank < PARTICLE_COUNT; rank += 1) {
    order[ranked[rank].index] = (rank / (PARTICLE_COUNT - 1)) * ORDER_MAX;
  }

  return { scatter, order };
}

function easedAt(order, progress) {
  const localT = Math.max(
    0,
    Math.min(1, (progress - order) / MIGRATION_DURATION),
  );
  return 1 - Math.pow(1 - localT, 3);
}

function createNetworkGeometry(positions) {
  const sampleIndices = Array.from({ length: NETWORK_SAMPLE }, (_, index) =>
    Math.floor((index / NETWORK_SAMPLE) * PARTICLE_COUNT),
  );
  const scatter = sampleIndices.map((_, index) => ({
    x: (rand(index * 13 + 1) - 0.5) * 4.8,
    y: (rand(index * 13 + 2) - 0.5) * 3.4,
    z: (rand(index * 13 + 3) - 0.5) * 2.2,
  }));
  const pairKeys = new Set();
  const pairs = [];

  sampleIndices.forEach((particleIndex, sampleIndex) => {
    const origin = scatter[sampleIndex];
    let nearest = [-1, -1];
    let distances = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

    sampleIndices.forEach((_, candidateSampleIndex) => {
      if (candidateSampleIndex === sampleIndex) return;
      const candidate = scatter[candidateSampleIndex];
      const dx = candidate.x - origin.x;
      const dy = candidate.y - origin.y;
      const dz = candidate.z - origin.z;
      const distance = dx * dx + dy * dy + dz * dz;
      if (distance < distances[0]) {
        distances = [distance, distances[0]];
        nearest = [candidateSampleIndex, nearest[0]];
      } else if (distance < distances[1]) {
        distances[1] = distance;
        nearest[1] = candidateSampleIndex;
      }
    });

    nearest.forEach((candidateSampleIndex) => {
      if (candidateSampleIndex < 0) return;
      const candidateIndex = sampleIndices[candidateSampleIndex];
      const key =
        particleIndex < candidateIndex
          ? `${particleIndex}_${candidateIndex}`
          : `${candidateIndex}_${particleIndex}`;
      if (pairKeys.has(key)) return;
      pairKeys.add(key);
      pairs.push([particleIndex, candidateIndex]);
    });
  });

  for (let index = 0; index < 22; index += 1) {
    const source = sampleIndices[Math.floor(rand(index * 19 + 4) * sampleIndices.length)];
    pairs.push([source, -index - 1]);
  }

  const linePositions = new Float32Array(pairs.length * 6);
  pairs.forEach(([start, end], index) => {
    const offset = index * 6;
    const x = positions[start * 3];
    const y = positions[start * 3 + 1];
    const z = positions[start * 3 + 2];
    linePositions[offset] = x;
    linePositions[offset + 1] = y;
    linePositions[offset + 2] = z;

    if (end >= 0) {
      linePositions[offset + 3] = positions[end * 3];
      linePositions[offset + 4] = positions[end * 3 + 1];
      linePositions[offset + 5] = positions[end * 3 + 2];
    } else {
      const length = Math.max(0.001, Math.hypot(x, y, z));
      const extension = 0.42 + rand(index * 31 + 8) * 0.42;
      linePositions[offset + 3] = x + (x / length) * extension;
      linePositions[offset + 4] = y + (y / length) * extension;
      linePositions[offset + 5] = z + (z / length) * extension;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  return geometry;
}

export function PointillistBrain({
  className = "",
  light = false,
  interactive = false,
}) {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 5.35);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const targets = buildBrainTargets();
    if (targets.length < 100) {
      renderer.dispose();
      return undefined;
    }

    const { geometry: particleGeometry, positions } =
      createBrainGeometry(targets);
    const assembly = createAssembly(positions);
    const networkGeometry = createNetworkGeometry(positions);

    const particleOpacity = light ? 0.92 : 0.84;
    const networkOpacity = light ? 0.078 : 0.11;
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.0145,
      sizeAttenuation: true,
      transparent: true,
      opacity: particleOpacity,
      vertexColors: true,
      depthWrite: false,
    });
    const networkMaterial = new THREE.LineBasicMaterial({
      color: light ? 0x078f51 : 0x22d986,
      transparent: true,
      opacity: networkOpacity,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    const network = new THREE.LineSegments(networkGeometry, networkMaterial);
    const group = new THREE.Group();
    group.add(network);
    group.add(particles);
    group.rotation.x = -0.025;
    group.rotation.y = 0.08;
    scene.add(group);

    let frame = 0;
    let elapsed = 0;
    let targetRotationX = group.rotation.x;
    let targetRotationY = group.rotation.y;

    const livePoints = particleGeometry.attributes.position.array;
    /* livePoints é o MESMO array de `positions`; os alvos precisam de cópia. */
    const pointAnatomy = Float32Array.from(positions);
    let assembleFrom = null;
    let assembled = reducedMotion;

    if (!reducedMotion) {
      livePoints.set(assembly.scatter);
      particleGeometry.attributes.position.needsUpdate = true;
      particleMaterial.opacity = 0;
      networkMaterial.opacity = 0;
    }

    const smooth = (x) => x * x * (3 - 2 * x);

    const stepAssembly = (now) => {
      if (assembled || assembleFrom === null) return;
      const progress = smooth(Math.min(1, (now - assembleFrom) / ASSEMBLE_MS));

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const eased = easedAt(assembly.order[index], progress);
        const offset = index * 3;
        for (let axis = 0; axis < 3; axis += 1) {
          const from = assembly.scatter[offset + axis];
          livePoints[offset + axis] =
            from + (pointAnatomy[offset + axis] - from) * eased;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      particleMaterial.opacity = particleOpacity * Math.min(1, progress * 4);
      /* A teia fica parada na forma final e só entra quando o cérebro fecha.
         Migrando junto ela virava um emaranhado de cordas longas cruzando o
         frame inteiro — era esse o "quadrado" antes do cérebro se formar. */
      networkMaterial.opacity =
        networkOpacity * Math.max(0, (progress - 0.72) / 0.28);

      if (progress >= 1) {
        livePoints.set(pointAnatomy);
        particleGeometry.attributes.position.needsUpdate = true;
        particleMaterial.opacity = particleOpacity;
        networkMaterial.opacity = networkOpacity;
        assembled = true;
      }
    };

    /* Dispara quando o cérebro entra em tela. */
    const visibility = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (assembleFrom === null) assembleFrom = performance.now();
        visibility.disconnect();
      },
      { threshold: 0.25 },
    );
    visibility.observe(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const render = (now) => {
      stepAssembly(now ?? performance.now());
      elapsed += 0.01;
      if (!reducedMotion) {
        group.rotation.x += (targetRotationX - group.rotation.x) * 0.035;
        group.rotation.y += (targetRotationY - group.rotation.y) * 0.035;
        group.rotation.z = Math.sin(elapsed * 0.52) * 0.006;
        const breath = 1 + Math.sin(elapsed * 0.8) * 0.006;
        group.scale.setScalar(breath);
      }
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    const handlePointerMove = (event) => {
      if (!interactive || reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = 0.08 + x * 0.18;
      targetRotationX = -0.025 + y * 0.1;
    };
    const handlePointerLeave = () => {
      targetRotationX = -0.025;
      targetRotationY = 0.08;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      particleGeometry.dispose();
      networkGeometry.dispose();
      particleMaterial.dispose();
      networkMaterial.dispose();
      renderer.dispose();
    };
  }, [interactive, light, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Cérebro tridimensional do FoundersOS formado por partículas e conexões verdes."
    />
  );
}
