import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    workspace: [
      {
        extends: true,
        test: {
          dir: "src/http/controllers",
          name: "e2e",
          environment:
            "./prisma/vitest-environment-prisma/vitest-environment-prisma.ts"
        }
      },
      {
        extends: true,
        test: {
          dir: "src/services",
          environment: "node",
          name: "unit"
        }
      }
    ],
    coverage: {
      all: false
    }
  }
});
