<script lang="ts">
  import type { Calculation } from "$lib/types/debug";
  import { filterFields } from "$lib/utils/debug-filter";

  function handleCheckbox(temp: keyof Calculation) {
      const check = $filterFields.get(temp);
      filterFields.update((m) => m.set(temp, !check));
  }
</script>

<p class="pl-2">Filter:</p>
<div class="flex w-full flex-wrap mb-2 ">
  {#if $filterFields}
    {#each $filterFields as [key, value]}
      <label>
        <input
          checked={value}
          type="checkbox"
          class="hidden peer"
          on:change={() => handleCheckbox(key)}
        />
        <div
          class="peer-checked:bg-dark peer-checked:text-white p-1 px-4 border-[1px] m-1 rounded-full"
        >
          {key}
        </div>
      </label>
    {/each}
  {/if}
</div>
