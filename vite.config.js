import { defineConfig } from "vite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import * as esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

/** Resolve .js imports to .ts when the .ts file exists (for src/ts). */
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

/**
 * Vite plugin: when the browser requests /js/main.js or /js/about.js,
 * compile the corresponding TypeScript from src/ts/ and serve it.
 * This lets local dev run off .ts sources without pre-building.
 */
function tsFromSourcePlugin() {
  const entryMap = {
    "/js/main.js": join(root, "src/ts/main.ts"),
    "/js/about.js": join(root, "src/ts/about.ts"),
  };

  return {
    name: "ts-from-source",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const entry = entryMap[req.url?.split("?")[0]];
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
