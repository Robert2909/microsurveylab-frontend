<script>
  import { createEventDispatcher } from 'svelte';
  export let encuestas = [];

  const dispatch = createEventDispatcher();

  function responder(encuesta) {
    dispatch('responder', encuesta);
  }

  function verResultados(encuesta) {
    dispatch('verResultados', encuesta);
  }
</script>

{#if encuestas.length === 0}
  <p class="empty">No hay encuestas registradas.</p>
{:else}
  <ul class="lista">
    {#each encuestas as encuesta}
      <li class="encuesta">
        <div class="texto">
          <strong class="pregunta">{encuesta.pregunta}</strong>
          {#if encuesta.descripcion}
            <p class="descripcion">{encuesta.descripcion}</p>
          {/if}
          <p class="estado">
            Estado:
            <span class:activa={encuesta.activa}>
              {encuesta.activa ? 'Activa' : 'Inactiva'}
            </span>
          </p>
        </div>

        <div class="acciones">
          <button type="button" on:click={() => responder(encuesta)}>
            Responder
          </button>
          <button type="button" on:click={() => verResultados(encuesta)}>
            Ver resultados
          </button>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .empty {
    text-align: center;
    color: #6b7280;
  }

  .lista {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .encuesta {
    border-radius: 0.9rem;
    border: 1px solid #e5e7eb;
    padding: 0.9rem 1rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background: #f9fafb;
  }

  .pregunta {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }

  .descripcion {
    margin: 0;
    font-size: 0.85rem;
    color: #6b7280;
  }

  .estado {
    margin: 0.4rem 0 0;
    font-size: 0.8rem;
    color: #6b7280;
  }

  .estado span {
    font-weight: 500;
  }

  .estado span.activa {
    color: #15803d;
  }

  .acciones {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-end;
  }

  .acciones button {
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    padding: 0.3rem 0.75rem;
    font-size: 0.85rem;
    background: white;
    cursor: pointer;
    transition: all 0.15s ease-out;
  }

  .acciones button:hover {
    background: #2563eb;
    border-color: #2563eb;
    color: white;
  }

  @media (max-width: 640px) {
    .encuesta {
      flex-direction: column;
      align-items: flex-start;
    }

    .acciones {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
