<script lang="ts">
  import type { PageServerData } from "./$types";
  import TreeView from "$lib/components/debug/tree-view.svelte";
  import DebugForm from "$lib/components/debug/debug-form.svelte";
  import type { YEAR } from "$lib/types/debug";

  export let data: PageServerData;

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
      });;
    console.log(event.detail.liqui);
  }
</script>

<div class="flex gap-2">
  <div
    class="border-2 border-dark-10 rounded-3xl px-10 pb-10 w-3/4 overflow-y-auto max-h-[90vh]"
  >
    <TreeView tree_data={treeContent} />
  </div>
  <div class="border-[1px] border-dark-10 rounded-3xl w-1/4 h-fit shadow-lg">
    <div class="bg-slate-100 rounded-3xl p-4">
      <DebugForm on:submit={handleSubmit}></DebugForm>
    </div>
  </div>
</div>
