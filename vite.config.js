import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    // Continua em 3001 por padrão; PORT permite subir uma segunda instância
    // sem conflitar com um dev server já rodando.
    port: Number(process.env.PORT) || 3001,
    host: "0.0.0.0"
  },
  build: {
    rollupOptions: {
      // Site multipágina: a landing é React; os guias são HTML estático, que é
      // o formato que o Google indexa sem depender de renderizar JS.
      input: {
        index: entry("index.html"),
        guias: entry("guias/index.html"),
        "guia-segundo-cerebro": entry(
          "guias/segundo-cerebro-para-empresas/index.html",
        ),
        "guia-ia-contexto": entry("guias/ia-que-conhece-seu-negocio/index.html"),
        "guia-memoria": entry(
          "guias/onde-guardar-a-memoria-da-empresa/index.html",
        ),
        "guia-gargalo": entry("guias/empresa-nao-roda-sem-mim/index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three-vendor";
          return undefined;
        },
      },
    },
  },
});
