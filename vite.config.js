import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Cambia TU_USUARIO por tu usuario real de GitHub
export default defineConfig({
  plugins: [svelte()],
  base: '/microsurveylab-frontend/'
})
