<script>
  import { createEventDispatcher } from 'svelte';
  import { crearEncuesta } from '../api';

  const dispatch = createEventDispatcher();

  let pregunta = '';
  let descripcion = '';
  let opciones = ['', '']; // mínimo 2
  let error = '';
  let cargando = false;

  function agregarOpcion() {
    opciones = [...opciones, ''];
  }

  function eliminarOpcion(index) {
    if (opciones.length <= 2) return;
    opciones = opciones.filter((_, i) => i !== index);
  }

  async function onSubmit(event) {
    event.preventDefault();
    error = '';

    const opcionesLimpias = opciones.map(o => o.trim()).filter(o => o !== '');

    if (!pregunta.trim()) {
      error = 'La pregunta es obligatoria.';
      return;
    }
    if (opcionesLimpias.length < 2) {
      error = 'Debes proporcionar al menos 2 opciones válidas.';
      return;
    }

    const payload = {
      pregunta: pregunta.trim(),
      descripcion: descripcion.trim(),
      opciones: opcionesLimpias
    };

    cargando = true;
    try {
      await crearEncuesta(payload);
      // notificar al padre para volver a la lista
      dispatch('creada');
    } catch (e) {
      error = e.message || 'Error al crear la encuesta.';
    } finally {
      cargando = false;
    }
  }
</script>

<section>
  <h2>Crear nueva encuesta</h2>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <form on:submit|preventDefault={onSubmit}>
    <div class="campo">
      <label for="pregunta">Pregunta</label>
      <input bind:value={pregunta} placeholder="Escribe la pregunta aquí" />
    </div>

    <div class="campo">
      <label for="descripcion">Descripción (opcional)</label>
      <textarea bind:value={descripcion} rows="2"></textarea>
    </div>

    <div class="campo">
      <label for="opciones">Opciones</label>
      {#each opciones as opcion, index}
        <div class="fila-opcion">
          <input
            bind:value={opciones[index]}
            placeholder={`Opción ${index + 1}`}
          />
          {#if opciones.length > 2}
            <button type="button" on:click={() => eliminarOpcion(index)}>
              X
            </button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={agregarOpcion}>Agregar opción</button>
    </div>

    <button type="submit" disabled={cargando}>
      {#if cargando}Guardando...{:else}Crear encuesta{/if}
    </button>
  </form>
</section>

<style>
  .campo {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    padding: 0.4rem 0.5rem;
  }

  .fila-opcion {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .error {
    color: red;
  }
</style>
