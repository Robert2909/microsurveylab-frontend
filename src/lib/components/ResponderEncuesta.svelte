<script>
  import { createEventDispatcher } from 'svelte';
  import { registrarVoto } from '../api';

  export let encuestaSeleccionada;

  const dispatch = createEventDispatcher();

  let opcionIdSeleccionada = null;
  let mensaje = '';
  let error = '';
  let cargando = false;

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
      // opcional: regresar a la lista
      dispatch('terminar');
    } catch (e) {
      error = e.message || 'Error al registrar el voto.';
    } finally {
      cargando = false;
    }
  }
</script>

{#if !encuestaSeleccionada}
  <p>No hay encuesta seleccionada.</p>
{:else}
  <section>
    <h2>Responder encuesta</h2>
    <h3>{encuestaSeleccionada.pregunta}</h3>

    {#if encuestaSeleccionada.descripcion}
      <p>{encuestaSeleccionada.descripcion}</p>
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
          {opcion.texto}
        </label>
      {/each}
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if mensaje}
      <p class="ok">{mensaje}</p>
    {/if}

    <button on:click={enviarVoto} disabled={cargando}>
      {#if cargando}Enviando...{:else}Enviar voto{/if}
    </button>
  </section>
{/if}

<style>
  .opciones {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .opcion {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error {
    color: red;
  }

  .ok {
    color: green;
  }
</style>
