<script>
  import { onMount } from 'svelte';
  import { obtenerEncuestas } from './lib/api';

  import EncuestasLista from './lib/components/EncuestasLista.svelte';
  import CrearEncuesta from './lib/components/CrearEncuesta.svelte';
  import ResponderEncuesta from './lib/components/ResponderEncuesta.svelte';
  import ResultadosEncuesta from './lib/components/ResultadosEncuesta.svelte';

  let encuestas = [];
  let cargando = false;
  let error = '';

  // vista actual: 'lista' | 'crear' | 'responder' | 'resultados'
  let vista = 'lista';
  let encuestaSeleccionada = null;

  async function cargarEncuestas() {
    cargando = true;
    error = '';
    try {
      encuestas = await obtenerEncuestas();
    } catch (e) {
      error = e.message || 'Error al obtener encuestas';
    } finally {
      cargando = false;
    }
  }

  function irALista() {
    error = '';
    vista = 'lista';
    encuestaSeleccionada = null;
    cargarEncuestas();
  }

  function irACrear() {
    error = '';
    vista = 'crear';
    encuestaSeleccionada = null;
  }

  function irAResponder(encuesta) {
    error = '';
    encuestaSeleccionada = encuesta;
    vista = 'responder';
  }

  function irAResultados(encuesta) {
    error = '';
    encuestaSeleccionada = encuesta;
    vista = 'resultados';
  }

  onMount(cargarEncuestas);
</script>

<main>
  <header class="topbar">
    <h1>MicroSurveyLab</h1>

    <nav>
      <button on:click={irALista}>Ver encuestas</button>
      <button on:click={irACrear}>Crear encuesta</button>
    </nav>
  </header>

  {#if cargando}
    <p>Cargando encuestas...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    {#if vista === 'lista'}
      <EncuestasLista
        {encuestas}
        on:responder={(e) => irAResponder(e.detail)}
        on:verResultados={(e) => irAResultados(e.detail)}
      />
    {:else if vista === 'crear'}
      <CrearEncuesta on:creada={irALista} />
    {:else if vista === 'responder'}
      <ResponderEncuesta {encuestaSeleccionada} on:terminar={irALista} />
    {:else if vista === 'resultados'}
      <ResultadosEncuesta {encuestaSeleccionada} on:volver={irALista} />
    {/if}
  {/if}
</main>

<style>
  main {
    font-family: system-ui, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  nav button {
    margin-left: 0.5rem;
  }

  .error {
    color: red;
  }
</style>
