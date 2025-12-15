import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Punto de arranque del frontend.
// Aquí solo montamos el componente raíz en el div #app del index.html.
const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
