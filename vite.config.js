import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

/**
 * As funções de `api/` rodam na Vercel, que o `vite dev` não emula. Este
 * plugin monta o mesmo handler no dev server para o formulário de interesse
 * poder ser testado localmente. Só existe em desenvolvimento — o build de
 * produção não é tocado.
 */
const devApi = () => ({
  name: "founders-dev-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith("/api/interesse")) return next();

      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      req.body = Buffer.concat(chunks).toString("utf8");

      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (payload) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(payload));
        return res;
      };

      try {
        const { default: handler } = await server.ssrLoadModule(
          "/api/interesse.js",
        );
        await handler(req, res);
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    });
  },
});

export default defineConfig({
  plugins: [react(), devApi()],
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
