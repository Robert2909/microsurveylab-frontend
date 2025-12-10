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
  <p>No hay encuesta seleccionada.</p>
{:else}
  <section>
    <h2>Resultados</h2>
    <h3>{encuestaSeleccionada.pregunta}</h3>

    {#if cargando}
      <p>Cargando resultados...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if resultados}
      <ul class="resultados">
        {#each resultados.resultados as r}
          <li>
            <div class="fila">
              <span>{r.texto}</span>
              <span>{r.totalVotos} voto(s) – {r.porcentaje.toFixed(1)}%</span>
            </div>
            <div class="barra">
              <div
                class="relleno"
                style={`width: ${r.porcentaje}%;`}
              ></div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}

    <button on:click={volver}>Volver</button>
  </section>
{/if}

<style>
  .resultados {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
  }

  .fila {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .barra {
    background: #eee;
    border-radius: 999px;
    overflow: hidden;
    height: 10px;
    margin-bottom: 0.5rem;
  }

  .relleno {
    height: 100%;
    background: #999;
  }

  .error {
    color: red;
  }
</style>
