import { defineConfig } from "vite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import * as esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const resolveTsPlugin = {
  name: "resolve-ts",
  setup(build) {
    build.onResolve({ filter: /\.js$/ }, (args) => {
      const importer = args.importer?.replace(/\\/g, "/") ?? "";
      if (!args.importer || !importer.includes("src/ts")) return null;
      const tsPath = args.path.replace(/\.js$/, ".ts");
      const abs = join(dirname(args.importer), tsPath);
      if (existsSync(abs)) return { path: abs };
      return null;
    });
  },
};

const scriptToTs = {
  "/js/main.js": join(root, "src/ts/main.ts"),
  "/js/about.js": join(root, "src/ts/about.ts"),
  "/js/projects-page.js": join(root, "src/ts/projects-page.ts"),
};

function tsFromSourcePlugin() {
  return {
    name: "ts-from-source",
    enforce: "pre",

    resolveId(id) {
      const normalized = id.startsWith("/") ? id : "/" + id;
      const clean = normalized.split("?")[0];
      const resolved = scriptToTs[clean];
      if (resolved) return resolved;
      return null;
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split("?")[0];
        const entry = scriptToTs[pathname];
        if (!entry) return next();

        try {
          const result = await esbuild.build({
            entryPoints: [entry],
            bundle: true,
            format: "esm",
            platform: "browser",
            write: false,
            outdir: "",
            outfile: "out.js",
            plugins: [resolveTsPlugin],
          });
          const out = result.outputFiles[0];
          if (!out) return next();
          res.setHeader("Content-Type", "application/javascript");
          res.end(out.text);
        } catch (err) {
          console.error("[ts-from-source]", err);
          res.statusCode = 500;
          res.end(`console.error(${JSON.stringify(String(err))});`);
        }
      });
    },
  };
}

export default defineConfig({
  root,
  plugins: [tsFromSourcePlugin()],
  server: {
    port: 8080,
  },
});
