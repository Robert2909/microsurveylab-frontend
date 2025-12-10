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
      dispatch('creada');
    } catch (e) {
      error = e.message || 'Error al crear la encuesta.';
    } finally {
      cargando = false;
    }
  }
</script>

{#if error}
  <p class="error">{error}</p>
{/if}

<form on:submit={onSubmit} class="form">
  <div class="campo">
    <label for="pregunta">Pregunta</label>
    <input
      id="pregunta"
      type="text"
      bind:value={pregunta}
      placeholder="Escribe la pregunta aquí"
    />
  </div>

  <div class="campo">
    <label for="descripcion">Descripción (opcional)</label>
    <textarea
      id="descripcion"
      rows="2"
      bind:value={descripcion}
      placeholder="Información adicional para quien responde"
    ></textarea>
  </div>

  <div class="campo">
    <label for="opciones">Opciones</label>
    {#each opciones as opcion, index}
      <div class="fila-opcion">
        <input
          type="text"
          bind:value={opciones[index]}
          placeholder={`Opción ${index + 1}`}
        />
        {#if opciones.length > 2}
          <button
            type="button"
            class="icon-btn"
            on:click={() => eliminarOpcion(index)}
          >
            ✕
          </button>
        {/if}
      </div>
    {/each}
    <button type="button" class="secondary" on:click={agregarOpcion}>
      Agregar opción
    </button>
  </div>

  <button type="submit" class="primary" disabled={cargando}>
    {#if cargando}Guardando...{:else}Crear encuesta{/if}
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
    gap: 0.35rem;
  }

  label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4b5563;
  }

  input,
  textarea {
    border-radius: 0.75rem;
    border: 1px solid #d1d5db;
    padding: 0.45rem 0.6rem;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb20;
  }

  .fila-opcion {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 0.35rem;
  }

  .icon-btn {
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 0 0.6rem;
    cursor: pointer;
  }

  .icon-btn:hover {
    background: #fee2e2;
    border-color: #fecaca;
  }

  .secondary {
    align-self: flex-start;
    margin-top: 0.25rem;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 0.35rem 0.8rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .secondary:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
  }

  .primary {
    align-self: center;
    margin-top: 0.5rem;
    border-radius: 999px;
    border: none;
    background: #2563eb;
    color: white;
    padding: 0.45rem 1.4rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.15s ease-out, transform 0.08s ease-out;
  }

  .primary:hover {
    background: #1d4ed8;
  }

  .primary:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .error {
    margin: 0 0 0.5rem;
    text-align: center;
    color: #b91c1c;
    font-size: 0.9rem;
  }
</style>
