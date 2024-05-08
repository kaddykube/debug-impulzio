<script lang="ts">
  import TreeView from "$lib/components/debug/tree-view.svelte";
  import DebugForm from "$lib/components/debug/debug-form.svelte";
  import type { Calculation, YEAR } from "$lib/types/debug";
  import TreeFilter from "$lib/components/debug/tree-filter.svelte";

  let treeContent: {
    name: number;
    children: {
      name: string;
      children: any;
      cols: {
        name: string;
        cols: Calculation;
      };
    }[];
  }[] | undefined;

  function handleSubmit(
    event: CustomEvent<{
      liqui: YEAR[];
      members: never[];
    }>
  ) {
    treeContent = event.detail.liqui.map((value) => {
      return {
        name: Number(value.year),
        children: [
          {
            name: "Berechnung Monate",
            children: value.months
              ? value.months.map((m: { [key: string]: any }) => {
                  return {
                    name: m.month,
                    cols: m,
                  };
                })
              : null,
            cols: { name: "Berechnung Jahr", cols: value.calculation },
          },
        ],
      };
    });
  }
</script>

<div class="flex gap-10">
  <div class="w-3/4 flex-col flex max-h-[90vh]">
    <p class="text-lg pl-2">Berechnungen Steuer&Liqui</p>
    <TreeFilter></TreeFilter>
    <div
      class="border-2 border-dark-10 rounded-3xl overflow-hidden max-h-[70vh]"
    >
      <div class="overflow-y-auto h-full px-10 pb-10 mb-2">
        {#if treeContent}
          <TreeView tree_data={treeContent} filter />
        {:else}
          <p class="text-sm mt-10">
            Bitte füge zuerst Kennzahlen und Mitarbeiter hinzu
          </p>
        {/if}
      </div>
    </div>
    <p class="text-lg pl-2 mt-4">Auswertung Mitarbeiter</p>
    <div
      class="border-2 border-dark-10 rounded-3xl px-10 pb-10 overflow-y-auto h-[20vh]"
    >
      <TreeView tree_data={[]} filter={false} />
    </div>
  </div>

  <div class=" w-1/4 h-fit">
    <div
      class="bg-slate-100 rounded-3xl p-4 border-[1px] border-dark-10 shadow-lg"
    >
      <DebugForm on:submit={handleSubmit}></DebugForm>
    </div>
  </div>
</div>
