<script lang="ts">
  import type { PageServerData } from "./$types";
  import TreeView from "$lib/components/debug/tree-view.svelte";
  import DebugForm from "$lib/components/debug/debug-form.svelte";
  import type { Calculation, YEAR } from "$lib/types/debug";
  import TreeFilter from "$lib/components/debug/tree-filter.svelte";

  export let data: PageServerData;

  let filterFields = new Map<keyof Calculation, boolean>([
        ["liquidityEU", true],
        ["liquidityUkasse", true],
        ["liquidityImpPSVKosten", true],
        ["bruttoAuszahlungMA", true],
        ["liquidityInclAuszahlung", true],
        ["liquidityAllKumVerzinst", true]
    ]);

  let treeContent = data.liqui.map((value) => {
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
    console.log(event.detail.liqui);
  }

  function handleFilter(event: CustomEvent<Map<keyof Calculation, boolean>>){
    console.log(event.detail);
  }
</script>

<div class="flex gap-2">
  <div class="w-3/4 flex-col flex max-h-[90vh]">
    <p class="text-lg pl-2">Berechnungen Steuer&Liqui</p>

    <TreeFilter filter={filterFields} on:change={handleFilter}></TreeFilter>
    <div
      class="border-2 border-dark-10 rounded-3xl px-10 pb-10 mb-2 overflow-y-auto max-h-[70vh]"
    >
      <TreeView tree_data={treeContent} filter={filterFields}/>
    </div>
    <p class="text-lg pl-2">Auswertung Mitarbeiter</p>
    <div
      class="border-2 border-dark-10 rounded-3xl px-10 pb-10 overflow-y-auto h-[20vh]"
    >
      <TreeView tree_data={[]} />
    </div>
  </div>

  <div class=" w-1/4 h-fit">
    <p class="text-lg pl-2">Erfassen von Logs</p>
    <div
      class="bg-slate-100 rounded-3xl p-4 border-[1px] border-dark-10 shadow-lg"
    >
      <DebugForm on:submit={handleSubmit}></DebugForm>
    </div>
  </div>
</div>
