<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import NumberInput from "$lib/components/number-input.svelte";
  import RangeSlider from "$lib/components/range-slider.svelte";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";

  let employerContribution = 50;
  let employeeContribution = 100;
  let newItemName = "";
  let isManagementChecked = false;
  let newItemDate = new Date("yyyy-MM");

  let list: {
    text: string;
    isManagement: boolean;
    birthDate: { year: number; month: number };
    employeeContribution: number;
    employerContribution: number;
  }[] = [];

  const formData = {
    members: list,
    companyTaxRate: 0,
    commitmentInterest: 0,
    investmentInterest: 0,
  };

  const { form, enhance, submit } = superForm(formData, {
    id: "calculator",
    SPA: true,
    //validators: zod(LiquidityCalcParamsSchema),
    taintedMessage: false,
    invalidateAll: false,
    resetForm: false,
    onUpdated: async ({ form }) => {
      if (form.valid) {
        //const data = await calcLiquidity(form.data);
      }
    },
  });

  function formatBirthDate(date: Date) {
    let data = {
      year: Number(newItemDate.toString().slice(0, 4)),
      month: Number(newItemDate.toString().slice(5, 8)),
    };
    if (isNaN(data.year) || isNaN(data.month)) {
      return { year: 0, month: 0 };
    } else {
      return data;
    }
  }

  function addToList() {
    const birthDateF = formatBirthDate(newItemDate);
    list = [
      ...list,
      {
        text: newItemName,
        isManagement: isManagementChecked,
        birthDate: birthDateF,
        employeeContribution: employeeContribution,
        employerContribution: employerContribution,
      },
    ];
    employerContribution = 50;
    employeeContribution = 100;
    newItemName = "";
    newItemDate = new Date("yyyy-MM");
    isManagementChecked = false;
  }

  function removeFromList(index: number) {
    list.splice(index, 1);
    list = list;
  }
</script>

<form id="calculator" method="POST" use:enhance class="flex-col">
  <p class="uppercase mb-1 font-bold mt-1">Kennzahlen *</p>
  <NumberInput
    bind:value={$form.companyTaxRate}
    label="Unternehmens&shy;steuersatz %"
    step={0.1}
    min={15}
    max={50}
  />
  <div class="flex w-full my-4">
    <NumberInput
      bind:value={$form.commitmentInterest}
      label="Zusagezins %"
      step={0.1}
      min={1}
      max={4}
    />
    <RangeSlider
      bind:value={$form.commitmentInterest}
      class="grow"
      step={0.1}
      min={1}
      max={4}
      tooltipText={`${$form.commitmentInterest}%`}
    />
  </div>
  <div class="bg-slate-100 rounded-3xl p-2 border-white border-2 mt-10">
    <p class="uppercase mb-4 font-bold">Mitarbeiter *</p>
    <div class="max-h-[100px] overflow-auto flex flex-wrap">
        <p>Anzahl Mitarbeiter {list.length}</p>
      {#each list as item, index}
        <div
          class={`flex flex-wrap border-2 p-2  w-5/6 rounded-2xl mb-1 bg-white ${item.isManagement && "!bg-slate-200"} [&>span]:pl-2`}
        >
          <span>{item.text} /</span>
          <span>Datum: {item.birthDate.year} {item.birthDate.month} /</span>
          <span>ANB: {item.employeeContribution} /</span>
          <span>AGB: {item.employerContribution} /</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span
          class="border-2 h-[27px] w-[27px] mt-2 ml-2 pl-2 rounded-full cursor-pointer hover:bg-gray hover:text-white"
          on:click={() => removeFromList(index)}>&times;</span
        >
      {/each}
    </div>
    <div
      class="flex flex-col gap-1 items-end mt-4 w-full border-2 p-2 rounded-3xl border-white"
    >
      <div class="flex w-full">
        <NumberInput
          bind:value={employeeContribution}
          label="Mtl. Arbeitnehmerbeitrag"
          step={1}
          min={0}
          max={350}
        />
        <RangeSlider
          bind:value={employeeContribution}
          class="grow"
          min={0}
          max={350}
          step={1}
          tooltipText={`${employeeContribution}€`}
        />
      </div>
      <div class="flex w-full">
        <NumberInput
          bind:value={employerContribution}
          label="Mtl. Arbeitgeberbeitrag"
          step={1}
          min={0}
          max={500}
        />
        <RangeSlider
          bind:value={employerContribution}
          class="grow"
          min={0}
          max={500}
          step={1}
          tooltipText={`${employerContribution}€`}
        />
      </div>
      <input
        bind:value={newItemName}
        type="text"
        placeholder="Bezeichnung Mitglied.."
        class=" w-full mt-4"
      />
      <input bind:value={newItemDate} type="month" class=" w-full my-1" />
      <label class="w-full flex justify-start mb-4">
        <input
          type="checkbox"
          bind:checked={isManagementChecked}
          class="mr-2 mt-[2px]"
        />
        Mitglied ist im Management tätig
      </label>
      <Button on:click={addToList} class="bg-dark p-2 px-6">Hinzufügen</Button>
    </div>
  </div>

  <div class="col-span-full flex flex-row gap-6 mt-4 justify-center">
    <Button type="submit" class="bg-dark">Berechnen</Button>
  </div>
</form>
