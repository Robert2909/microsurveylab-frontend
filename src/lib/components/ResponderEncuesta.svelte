<script>
  import { registrarVoto } from '../api';
  import { createEventDispatcher } from 'svelte';

  // Recibe la encuesta con sus opciones ya cargadas (la traemos desde la lista).
  export let encuestaSeleccionada;

  const dispatch = createEventDispatcher();

  let opcionId = null;
  let error = '';
  let cargando = false;

  async function enviar() {
    // Validación mínima de UI para no mandar requests vacíos.
    if (!opcionId) {
      error = 'Selecciona una opción.';
      return;
    }

    error = '';
    cargando = true;

    try {
      await registrarVoto(encuestaSeleccionada.id, opcionId);
      // Volvemos a la vista anterior (normalmente lista o resultados).
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
  <h3 class="pregunta">{encuestaSeleccionada.pregunta}</h3>

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

    <button type="button" class="primary" on:click={enviar} disabled={cargando}>
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

  .pregunta {
    margin: 0.25rem 0 0;
  }

  .opciones {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }

  .opcion {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-align: left;
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
