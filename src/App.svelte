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

<main class="app">
  <div class="shell">
    <header class="topbar">
      <div class="branding">
        <h1>MicroSurveyLab</h1>
        <p>Encuestas rápidas, resultados claros.</p>
      </div>

      <nav class="nav">
        <button
          class:active={vista === 'lista'}
          on:click={irALista}
          type="button"
        >
          Ver encuestas
        </button>
        <button
          class:active={vista === 'crear'}
          on:click={irACrear}
          type="button"
        >
          Crear encuesta
        </button>
      </nav>
    </header>

    <section class="content-card">
      {#if cargando}
        <p class="state-text">Cargando encuestas...</p>
      {:else if error}
        <p class="state-text error">{error}</p>
      {:else}
        {#if vista === 'lista'}
          <h2 class="section-title">Encuestas disponibles</h2>
          <EncuestasLista
            {encuestas}
            on:responder={(e) => irAResponder(e.detail)}
            on:verResultados={(e) => irAResultados(e.detail)}
          />
        {:else if vista === 'crear'}
          <h2 class="section-title">Crear nueva encuesta</h2>
          <CrearEncuesta on:creada={irALista} />
        {:else if vista === 'responder'}
          <h2 class="section-title">Responder encuesta</h2>
          <ResponderEncuesta {encuestaSeleccionada} on:terminar={irALista} />
        {:else if vista === 'resultados'}
          <h2 class="section-title">Resultados</h2>
          <ResultadosEncuesta {encuestaSeleccionada} on:volver={irALista} />
        {/if}
      {/if}
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background: #f5f5f7;
    color: #111827;
  }

  .app {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .shell {
    width: 100%;
    max-width: 960px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .branding h1 {
    margin: 0;
    font-size: 2.4rem;
    letter-spacing: 0.05em;
  }

  .branding p {
    margin: 0.2rem 0 0;
    font-size: 0.9rem;
    color: #6b7280;
  }

  .nav {
    display: flex;
    gap: 0.5rem;
  }

  .nav button {
    border: 1px solid #d1d5db;
    background-color: #f3f4f6;
    color: #111827;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.15s ease-out;
  }

  .nav button:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }

  .nav button.active {
    background-color: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
  }

  .content-card {
    background: white;
    border-radius: 1.25rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    padding: 1.75rem 1.75rem 1.5rem;
  }

  .section-title {
    margin: 0 0 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  .state-text {
    text-align: center;
    color: #6b7280;
  }

  .state-text.error {
    color: #b91c1c;
  }

  .footer {
    text-align: center;
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.5rem;
  }

  @media (max-width: 640px) {
    .topbar {
      flex-direction: column;
      align-items: flex-start;
    }

    .branding h1 {
      font-size: 1.8rem;
    }

    .content-card {
      padding: 1.25rem 1rem 1.25rem;
    }
  }
</style>
