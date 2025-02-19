import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
// @ts-expect-error wrongly types
import zig from "vite-plugin-zig"
import tsConfig from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [zig(), tsConfig(), react()],
  build: { target: "esnext" },
})
