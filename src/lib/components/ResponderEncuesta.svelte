<script>
  import { registrarVoto } from '../api';
  import { createEventDispatcher } from 'svelte';

  export let encuestaSeleccionada;
  const dispatch = createEventDispatcher();

  let opcionId = null;
  let error = '';
  let cargando = false;

  async function enviar() {
    if (!opcionId) {
      error = 'Selecciona una opción.';
      return;
    }

    cargando = true;

    try {
      await registrarVoto(encuestaSeleccionada.id, opcionId);
      dispatch('terminar');
    } catch (e) {
      error = e.message;
    } finally {
      cargando = false;
    }
  }
</script>

<section class="wrapper">
  <h3>{encuestaSeleccionada.pregunta}</h3>

  {#if encuestaSeleccionada.descripcion}
  <p class="text-muted">{encuestaSeleccionada.descripcion}</p>
  {/if}

  <div class="opciones">
    {#each encuestaSeleccionada.opciones as op}
      <label class="opcion">
        <input type="radio" name="opcion" value={op.id} on:change={() => opcionId = op.id} />
        <span>{op.texto}</span>
      </label>
    {/each}
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="acciones">
    <button class="secondary" on:click={() => dispatch('terminar')}>Volver a encuestas</button>
    <button class="primary" on:click={enviar} disabled={cargando}>
      {cargando ? 'Enviando...' : 'Enviar voto'}
    </button>
  </div>
</section>

<style>
  .wrapper {
    max-width: 520px;
    margin: 0 auto;
  }

  .opciones {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin: 1rem 0;
  }

  .opcion {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .acciones {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
</style>
