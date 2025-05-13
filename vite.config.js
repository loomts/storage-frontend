import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { createVuePlugin } from "vite-plugin-vue2";
import viteCompression from "vite-plugin-compression";
import path from "path";

const HOST = "0.0.0.0";
const REPLACEMENT = `${path.resolve(__dirname, "./src")}/`;

export default ({ mode }) => {
  return defineConfig({
    base: "./",
    server: {
      host: HOST,
      port: 8000,
    },
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // .vue added
      alias: [
        {
          find: "@/",
          replacement: REPLACEMENT,
        },
        {
          find: "src/",
          replacement: REPLACEMENT,
        },
      ],
    },
    plugins: [
      createVuePlugin({
        jsx: true,
        jsxOptions: {
          injectH: true
        }
      }),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
  });
};
