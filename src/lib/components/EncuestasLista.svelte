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

  function editar(encuesta) {
    dispatch('editar', encuesta);
  }

  function eliminar(encuesta) {
    dispatch('eliminar', encuesta);
  }
</script>

{#if encuestas.length === 0}
  <p class="text-muted" style="text-align:center;">No hay encuestas registradas.</p>
{:else}
  <ul class="lista">
    {#each encuestas as encuesta}
      <li class="encuesta list-card">
        <div class="texto">
          <strong>{encuesta.pregunta}</strong>

          {#if encuesta.descripcion}
            <p class="text-muted">{encuesta.descripcion}</p>
          {/if}

          <p class="estado">
            Estado:
            <span>{encuesta.activa ? 'Activa' : 'Inactiva'}</span>
          </p>
        </div>

        <div class="acciones">
        <button on:click={() => responder(encuesta)}>Responder</button>
        <button on:click={() => verResultados(encuesta)}>Ver resultados</button>
        <button class="secondary" on:click={() => editar(encuesta)}>Editar</button>
        <button class="secondary" on:click={() => eliminar(encuesta)}>Eliminar</button>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .lista {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .encuesta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .acciones {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  @media (max-width: 640px) {
    .encuesta {
      flex-direction: column;
      align-items: flex-start;
    }

    .acciones {
      flex-direction: row;
    }
  }
</style>
