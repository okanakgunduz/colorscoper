import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfig from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsConfig(), react()],
});
