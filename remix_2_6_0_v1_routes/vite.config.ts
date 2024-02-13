import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return Promise.resolve(createRoutesFromFolders(defineRoutes));
      },
    }),
    tsconfigPaths()
  ],
});
