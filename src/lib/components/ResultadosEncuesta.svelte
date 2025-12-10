<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { obtenerResultados } from '../api';

  export let encuestaSeleccionada;

  const dispatch = createEventDispatcher();

  let resultados = null;
  let cargando = false;
  let error = '';

  async function cargarResultados() {
    if (!encuestaSeleccionada) return;
    cargando = true;
    error = '';
    try {
      resultados = await obtenerResultados(encuestaSeleccionada.id);
    } catch (e) {
      error = e.message || 'Error al obtener resultados.';
    } finally {
      cargando = false;
    }
  }

  function volver() {
    dispatch('volver');
  }

  onMount(cargarResultados);
</script>

{#if !encuestaSeleccionada}
  <p class="state">No hay encuesta seleccionada.</p>
{:else}
  <section class="wrapper">
    <h3 class="titulo">{encuestaSeleccionada.pregunta}</h3>

    {#if cargando}
      <p class="state">Cargando resultados...</p>
    {:else if error}
      <p class="state error">{error}</p>
    {:else if resultados}
      <ul class="resultados">
        {#each resultados.resultados as r}
          <li>
            <div class="fila">
              <span>{r.texto}</span>
              <span class="meta">
                {r.totalVotos} voto(s) – {r.porcentaje.toFixed(1)}%
              </span>
            </div>
            <div class="barra">
              <div class="relleno" style={`width: ${r.porcentaje}%;`}></div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}

    <button type="button" class="primary" on:click={volver}>
      Volver
    </button>
  </section>
{/if}

<style>
  .wrapper {
    max-width: 560px;
    margin: 0 auto;
  }

  .titulo {
    margin: 0 0 1rem;
    text-align: center;
    font-size: 1.05rem;
  }

  .state {
    text-align: center;
    color: #6b7280;
  }

  .state.error {
    color: #b91c1c;
  }

  .resultados {
    list-style: none;
    padding: 0;
    margin: 0 0 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .fila {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .meta {
    color: #6b7280;
    font-size: 0.85rem;
  }

  .barra {
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    height: 10px;
  }

  .relleno {
    height: 100%;
    background: #2563eb;
  }

  .primary {
    display: block;
    margin: 0 auto;
    border-radius: 999px;
    border: none;
    background-color: #2563eb;
    color: #ffffff;
    padding: 0.4rem 1.2rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.15s ease-out;
  }

  .primary:hover {
    background: #1d4ed8;
  }
</style>
