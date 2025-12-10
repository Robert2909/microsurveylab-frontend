<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { crearEncuesta, actualizarEncuesta } from '../api';

  /**
   * @typedef {Object} EncuestaDTO
   * @property {number} id
   * @property {string} pregunta
   * @property {string | null} [descripcion]
   * @property {boolean} [activa]
   */

  /** @type {'crear' | 'editar'} */
  export let modo = 'crear';

  /** @type {EncuestaDTO | null} */
  export let encuestaInicial = null;

  const dispatch = createEventDispatcher();

  let pregunta = '';
  let descripcion = '';
  let opciones = ['', ''];
  let activa = true;

  let error = '';
  let cargando = false;

  onMount(() => {
    if (modo === 'editar' && encuestaInicial) {
      pregunta = encuestaInicial.pregunta ?? '';
      descripcion = encuestaInicial.descripcion ?? '';
      activa = encuestaInicial.activa ?? true;
    }
  });

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

    const preguntaLimpia = pregunta.trim();
    const descripcionLimpia = descripcion.trim();

    if (!preguntaLimpia) {
      error = 'La pregunta es obligatoria.';
      return;
    }

    if (modo === 'crear') {
      const opcionesLimpias = opciones
        .map((o) => o.trim())
        .filter((o) => o !== '');

      if (opcionesLimpias.length < 2) {
        error = 'Debes proporcionar al menos 2 opciones válidas.';
        return;
      }

      const payload = {
        pregunta: preguntaLimpia,
        descripcion: descripcionLimpia,
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
      return;
    }

    if (modo === 'editar' && encuestaInicial) {
      const payload = {
        pregunta: preguntaLimpia,
        descripcion: descripcionLimpia,
        activa: activa
      };

      cargando = true;
      try {
        await actualizarEncuesta(encuestaInicial.id, payload);
        dispatch('creada');
      } catch (e) {
        error = e.message || 'Error al actualizar la encuesta.';
      } finally {
        cargando = false;
      }
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

  {#if modo === 'editar'}
    <div class="campo fila-activa">
      <label for="activa">Encuesta activa</label>
      <input
        id="activa"
        type="checkbox"
        bind:checked={activa}
      />
    </div>
  {/if}

  {#if modo === 'crear'}
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
  {/if}

  <button type="submit" class="primary" disabled={cargando}>
    {#if cargando}
      {modo === 'crear' ? 'Guardando...' : 'Actualizando...'}
    {:else}
      {modo === 'crear' ? 'Crear encuesta' : 'Guardar cambios'}
    {/if}
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
    transition:
      border-color 0.15s ease-out,
      box-shadow 0.15s ease-out,
      background-color 0.15s ease-out,
      color 0.15s ease-out;
    background-color: #ffffff;
    color: #111827;
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
    background-color: #f3f4f6;
    color: #111827;
    padding: 0.35rem 0.8rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .secondary:hover {
    background-color: #e5e7eb;
    border-color: #d1d5db;
  }

  .primary {
    align-self: center;
    margin-top: 0.5rem;
    border-radius: 999px;
    border: none;
    background-color: #2563eb;
    color: #ffffff;
    padding: 0.45rem 1.4rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition:
      background-color 0.15s ease-out,
      transform 0.08s ease-out;
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

  .fila-activa {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
</style>
