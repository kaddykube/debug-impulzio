<script lang="ts">
  import type { TreeItem } from "./tree-view.svelte";
  import { filterFields } from "$lib/utils/debug-filter";
  export let item: TreeItem | undefined;
  export let filter: boolean;
</script>
<slot />
{#if item?.cols}
  <div class="flex border-collapse flex-wrap gap-1 w-full pt-2">
    {#each Object.entries(item?.cols) as [title, value]}
      {#if filter}
        {#if title !== "month"}
          <div
            class={`flex-col border-y-2 border-x-[1px] border-dark-10 rounded-lg text-center break-words overflow-hidden ${$filterFields.get(title) ? 'visible' : 'hidden'}`}
          >
            <div class="border-b-2"><p class="p-2 bg-gray">{title}</p></div>
            <p class="p-2">{value}</p>
          </div>
        {/if}
      {:else if title !== "month"}
        <div
          class="flex-col border-y-2 border-x-[1px] border-dark-10 rounded-lg text-center break-words overflow-hidden"
        >
          <div class="border-b-2"><p class="p-2 bg-gray">{title}</p></div>
          <p class="p-2">{value}</p>
        </div>
      {/if}
    {/each}
  </div>
{/if}
