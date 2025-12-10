<script>
  import { createEventDispatcher } from 'svelte';
  import { registrarVoto } from '../api';

  export let encuestaSeleccionada;

  const dispatch = createEventDispatcher();

  let opcionIdSeleccionada = null;
  let mensaje = '';
  let error = '';
  let cargando = false;

  function volver() {
    dispatch('terminar');
  }

  async function enviarVoto() {
    if (!opcionIdSeleccionada) {
      error = 'Debes seleccionar una opción.';
      return;
    }
    error = '';
    mensaje = '';
    cargando = true;

    try {
      await registrarVoto(encuestaSeleccionada.id, opcionIdSeleccionada);
      mensaje = 'Voto registrado correctamente.';
      // regresamos a la lista después de votar
      dispatch('terminar');
    } catch (e) {
      error = e.message || 'Error al registrar el voto.';
    } finally {
      cargando = false;
    }
  }
</script>

{#if !encuestaSeleccionada}
  <p class="state">No hay encuesta seleccionada.</p>
{:else}
  <section class="wrapper">
    <h3 class="titulo">{encuestaSeleccionada.pregunta}</h3>

    {#if encuestaSeleccionada.descripcion}
      <p class="descripcion">{encuestaSeleccionada.descripcion}</p>
    {/if}

    <div class="opciones">
      {#each encuestaSeleccionada.opciones as opcion}
        <label class="opcion">
          <input
            type="radio"
            name="opcion"
            value={opcion.id}
            on:change={() => (opcionIdSeleccionada = opcion.id)}
          />
          <span>{opcion.texto}</span>
        </label>
      {/each}
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if mensaje}
      <p class="ok">{mensaje}</p>
    {/if}

    <div class="acciones">
      <button type="button" class="secondary" on:click={volver}>
        Volver a encuestas
      </button>
      <button
        type="button"
        class="primary"
        on:click={enviarVoto}
        disabled={cargando}
      >
        {#if cargando}Enviando...{:else}Enviar voto{/if}
      </button>
    </div>
  </section>
{/if}

<style>
  .state {
    text-align: center;
    color: #6b7280;
  }

  .wrapper {
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }

  .titulo {
    margin: 0 0 0.25rem;
    font-size: 1.1rem;
  }

  .descripcion {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    color: #6b7280;
  }

  .opciones {
    margin: 1rem 0 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    align-items: flex-start;
  }

  .opcion {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.92rem;
    cursor: pointer;
  }

  .opcion input {
    accent-color: #2563eb;
  }

  .error {
    color: #b91c1c;
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
  }

  .ok {
    color: #15803d;
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
  }

  .acciones {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .secondary,
  .primary {
    border-radius: 999px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s ease-out;
  }

  .secondary {
    border-color: #e5e7eb;
    background: #f9fafb;
    color: #374151;
  }

  .secondary:hover {
    background: #f3f4f6;
  }

  .primary {
    border: none;
    background: #2563eb;
    color: white;
  }

  .primary:hover {
    background: #1d4ed8;
  }

  .primary:disabled {
    opacity: 0.7;
    cursor: default;
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
