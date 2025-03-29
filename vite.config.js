import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodeModulesPolyfillPlugin()],
})
