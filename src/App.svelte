<script>
  import { onMount } from 'svelte';
  import { obtenerEncuestas } from './lib/api';

  import EncuestasLista from './lib/components/EncuestasLista.svelte';
  import CrearEncuesta from './lib/components/CrearEncuesta.svelte';
  import ResponderEncuesta from './lib/components/ResponderEncuesta.svelte';
  import ResultadosEncuesta from './lib/components/ResultadosEncuesta.svelte';
  import {eliminarEncuesta } from './lib/api';

  let encuestas = [];
  let cargando = false;
  let error = '';

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
    vista = 'lista';
    encuestaSeleccionada = null;
    cargarEncuestas();
  }

  function irACrear() {
    vista = 'crear';
    encuestaSeleccionada = null;
  }

  function irAResponder(encuesta) {
    encuestaSeleccionada = encuesta;
    vista = 'responder';
  }

  function irAResultados(encuesta) {
    encuestaSeleccionada = encuesta;
    vista = 'resultados';
  }

  function irAEditar(encuesta) {
    encuestaSeleccionada = encuesta;
    vista = 'editar';
  }

  async function eliminarDesdeLista(encuesta) {
    if (!confirm(`¿Eliminar la encuesta "${encuesta.pregunta}"?`)) return;

    try {
      await eliminarEncuesta(encuesta.id);
      await cargarEncuestas();
    } catch (e) {
      error = e.message || 'Error al eliminar encuesta.';
    }
  }

  onMount(cargarEncuestas);
</script>

<style>
  @import './app.css';

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
  }

  .branding h1 {
    margin: 0;
    font-size: 2.2rem;
  }

  .branding p {
    margin: 0;
    font-size: 0.9rem;
  }
</style>

<main class="app">
  <div class="shell">

    <header class="topbar">
      <div class="branding">
        <h1>MicroSurveyLab</h1>
        <p>Encuestas rápidas, resultados claros.</p>
      </div>

      <nav class="nav">
        <button class:active={vista === 'lista'} on:click={irALista}>Ver encuestas</button>
        <button class:active={vista === 'crear'} on:click={irACrear}>Crear encuesta</button>
      </nav>
    </header>

    <section class="content-card">
      {#if cargando}
        <p class="state-text">Cargando encuestas...</p>
      {:else if error}
        <p class="error">{error}</p>
      {:else}
        {#if vista === 'lista'}
          <h2 class="section-title">Encuestas disponibles</h2>
          <EncuestasLista
            {encuestas}
            on:responder={(e) => irAResponder(e.detail)}
            on:verResultados={(e) => irAResultados(e.detail)}
            on:editar={(e) => irAEditar(e.detail)}
            on:eliminar={(e) => eliminarDesdeLista(e.detail)}
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

        {:else if vista === 'editar'}
          <h2 class="section-title">Editar encuesta</h2>
          <CrearEncuesta
            modo="editar"
            encuestaInicial={encuestaSeleccionada}
            on:creada={irALista}
          />
        {/if}
      {/if}
    </section>

  </div>
</main>