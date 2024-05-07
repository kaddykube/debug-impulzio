<script lang="ts">
  import type { TreeItem } from "./tree-view.svelte";

  export let item: TreeItem | undefined;
</script>

<slot />
{#if item?.cols}
  <div class="flex border-collapse flex-wrap gap-2 w-full">
    {#each Object.entries(item?.cols) as [title, value]}
      {#if title !== "month"}
        <div
          class="flex-col border-y-2 border-x-[1px] border-dark-10 rounded-xl text-center break-words"
        >
          <div class="border-b-2"><p class="p-2 bg-gray">{title}</p></div>
          <p class="p-2">{value}</p>
        </div>
      {/if}
    {/each}
  </div>
{/if}
