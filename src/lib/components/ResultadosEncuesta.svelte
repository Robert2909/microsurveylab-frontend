<script>
  import { obtenerResultados } from '../api';
  import { createEventDispatcher, onMount } from 'svelte';

  export let encuestaSeleccionada;

  const dispatch = createEventDispatcher();

  let datos = null;
  let cargando = false;
  let error = '';

  // Carga resultados al abrir la pantalla.
  async function cargar() {
    cargando = true;
    error = '';
    try {
      datos = await obtenerResultados(encuestaSeleccionada.id);
    } catch (e) {
      error = e.message || 'No se pudieron cargar los resultados.';
    } finally {
      cargando = false;
    }
  }

  onMount(cargar);
</script>

<section class="wrapper">
  <h3>{encuestaSeleccionada.pregunta}</h3>

  {#if cargando}
    <p class="text-muted">Cargando...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if datos}
    <ul class="resultados">
      {#each datos.resultados as r}
        <li>
          <div class="fila">
            <span>{r.texto}</span>
            <span class="text-muted">
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

  <button class="primary" on:click={() => dispatch('volver')}>Volver</button>
</section>

<style>
  .wrapper {
    max-width: 560px;
    margin: 0 auto;
  }

  .resultados {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fila {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .barra {
    height: 10px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }

  .relleno {
    background: var(--color-primary);
    height: 100%;
  }
</style>
