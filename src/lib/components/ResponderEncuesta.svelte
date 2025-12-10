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

    error = '';
    cargando = true;

    try {
      await registrarVoto(encuestaSeleccionada.id, opcionId);
      dispatch('terminar');
    } catch (e) {
      error = e.message || 'Error al registrar el voto.';
    } finally {
      cargando = false;
    }
  }

  function volver() {
    dispatch('terminar');
  }
</script>

<section class="wrapper">
  <h3>{encuestaSeleccionada.pregunta}</h3>

  {#if encuestaSeleccionada.descripcion}
    <p class="text-muted">{encuestaSeleccionada.descripcion}</p>
  {/if}

  <div class="opciones">
    {#each encuestaSeleccionada.opciones as opcion}
      <label class="opcion">
        <input
          type="radio"
          name="opcion"
          value={opcion.id}
          on:change={() => (opcionId = opcion.id)}
        />
        <span>{opcion.texto}</span>
      </label>
    {/each}
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="acciones">
    <button type="button" class="secondary" on:click={volver}>
      Volver a encuestas
    </button>
    <button
      type="button"
      class="primary"
      on:click={enviar}
      disabled={cargando}
    >
      {#if cargando}Enviando...{:else}Enviar voto{/if}
    </button>
  </div>
</section>

<style>
  .wrapper {
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }

  .opciones {
    margin: 1.5rem auto;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    align-items: flex-start;
  }

  .opcion {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
    cursor: pointer;
    width: 100%;
  }

  .opcion input {
    accent-color: #2563eb;
    transform: scale(1.1);
  }

  .acciones {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    .acciones {
      flex-direction: column-reverse;
    }

    .acciones button {
      width: 100%;
    }
  }
</style>
