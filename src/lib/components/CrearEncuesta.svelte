<script>
  import { createEventDispatcher } from 'svelte';
  import { crearEncuesta } from '../api';

  const dispatch = createEventDispatcher();

  let pregunta = '';
  let descripcion = '';
  let opciones = ['', ''];
  let error = '';
  let cargando = false;

  function agregarOpcion() {
    opciones = [...opciones, ''];
  }

  function eliminarOpcion(index) {
    if (opciones.length > 2)
      opciones = opciones.filter((_, i) => i !== index);
  }

  async function enviar(event) {
    event.preventDefault();
    error = '';

    const limpias = opciones.map(o => o.trim()).filter(o => o !== '');

    if (!pregunta.trim()) {
      error = 'La pregunta es obligatoria.';
      return;
    }

    if (limpias.length < 2) {
      error = 'Debes escribir al menos 2 opciones.';
      return;
    }

    cargando = true;
    try {
      await crearEncuesta({
        pregunta: pregunta.trim(),
        descripcion: descripcion.trim(),
        opciones: limpias
      });
      dispatch('creada');
    } catch (e) {
      error = e.message;
    } finally {
      cargando = false;
    }
  }
</script>

{#if error}
<p class="error">{error}</p>
{/if}

<form on:submit={enviar} class="form">
  <div class="campo">
    <label for="pregunta">Pregunta</label>
    <input type="text" bind:value={pregunta} placeholder="Escribe la pregunta aquí" />
  </div>

  <div class="campo">
    <label for="descripcion">Descripción (opcional)</label>
    <textarea rows="2" bind:value={descripcion}></textarea>
  </div>

  <div class="campo">
    <label for="opciones">Opciones</label>

    {#each opciones as opcion, i}
      <div class="fila">
        <input type="text" bind:value={opciones[i]} placeholder={`Opción ${i + 1}`} />
        {#if opciones.length > 2}
          <button type="button" class="secondary" on:click={() => eliminarOpcion(i)}>✕</button>
        {/if}
      </div>
    {/each}

    <button type="button" class="secondary" on:click={agregarOpcion}>Agregar opción</button>
  </div>

  <button type="submit" class="primary" disabled={cargando}>
    {cargando ? 'Guardando...' : 'Crear encuesta'}
  </button>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .campo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .fila {
    display: flex;
    gap: 0.5rem;
  }
</style>
