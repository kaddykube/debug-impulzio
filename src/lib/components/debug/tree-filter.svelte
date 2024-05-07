<script lang="ts">
  import type { Calculation } from "$lib/types/debug";

  import { createEventDispatcher } from "svelte";

  export let filter: Map<keyof Calculation, boolean> | undefined;
  const dispatch = createEventDispatcher();

  function handleCheckbox(temp: keyof Calculation) {
    if (filter) {
      const check = filter?.get(temp);
      filter.set(temp, !check);
      
    dispatch("change", filter);
    }
  }
</script>
<div class="flex w-full flex-wrap p-2">
{#if filter}
  {#each [...filter.keys()] as temp}

    <label>
        <input checked={filter.get(temp)} type="checkbox" class="hidden peer" 
        on:change={() => handleCheckbox(temp)}/>
        <div class="peer-checked:bg-dark peer-checked:text-white p-1 px-4 border-[1px] m-1 rounded-full">{temp}</div>
    </label>
  {/each}
{/if}
</div>
