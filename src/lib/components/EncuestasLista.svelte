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

<section>
  <h2>Encuestas disponibles</h2>

  {#if encuestas.length === 0}
    <p>No hay encuestas registradas.</p>
  {:else}
    <ul>
      {#each encuestas as encuesta}
        <li class="encuesta">
          <div>
            <strong>{encuesta.pregunta}</strong>
            {#if encuesta.descripcion}
              <p class="descripcion">{encuesta.descripcion}</p>
            {/if}
            <p class="estado">
              Estado: {encuesta.activa ? 'Activa' : 'Inactiva'}
            </p>
          </div>

          <div class="acciones">
            <button on:click={() => responder(encuesta)}>Responder</button>
            <button on:click={() => verResultados(encuesta)}>Ver resultados</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  .encuesta {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .descripcion {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #555;
  }

  .estado {
    font-size: 0.85rem;
    color: #666;
  }

  .acciones button {
    margin-left: 0.5rem;
  }
</style>
