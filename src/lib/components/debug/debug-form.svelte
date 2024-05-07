<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import NumberInput from "$lib/components/number-input.svelte";
  import RangeSlider from "$lib/components/range-slider.svelte";
  import { superForm } from "sveltekit-superforms";
  import { getCalculations } from '$lib/api/calculation';
  import { createEventDispatcher } from "svelte";
  import {
    CalculationParamsSchema,
    type Member,
    type CalculationParams,
  } from "$lib/types";
  import { zod } from "sveltekit-superforms/adapters";

  const dispatch = createEventDispatcher();

  let employerContribution = 50;
  let employeeContribution = 100;
  let newItemName = "";
  let isManagementChecked = false;
  let newItemDate = new Date("yyyy-MM");

  let list: Member[] = [];

  const formData: CalculationParams = {
    members: list,
    companyTaxRate: 20,
    commitmentInterest: 4,
    investmentInterest: 0,
  };

  const { form, enhance, submit } = superForm(formData, {
    id: "calculator",
    SPA: true,
    validators: zod(CalculationParamsSchema),
    taintedMessage: false,
    invalidateAll: false,
    resetForm: false,
    onUpdated: async ({ form }) => {
      if (form.valid) {
        const data = await getCalculations(form.data);
        dispatch('submit', data);
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
  <p class=" mb-1 text-lg mt-1">Kennzahlen</p>
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
  <div class="flex w-full my-4">
    <NumberInput
      bind:value={$form.investmentInterest}
      label="Investitionszins %"
      step={0.1}
      min={0}
      max={10}
    />
    <RangeSlider
      bind:value={$form.investmentInterest}
      class="grow"
      step={0.1}
      min={1}
      max={10}
      tooltipText={`${$form.investmentInterest}%`}
    />
  </div>
  <div
    class="bg-slate-100 rounded-3xl px-4 py-2 border-white border-2 mt-10 shadow-lg"
  >
    <p class="mb-4 text-lg">Mitarbeiter</p>
    <p>Anzahl Mitarbeiter {list.length}</p>
    <div class="max-h-[100px] overflow-auto flex flex-wrap">
     
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
    <p class="w-full mb-2">Mitarbeiter hinzufügen:</p>
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

      <p class="text-dark text-xs w-full text-left mt-2">
        Bezeichnung (optional)
      </p>
      <input
        bind:value={newItemName}
        type="text"
        placeholder="Bezeichnung"
        class=" w-full mb-1"
      />
      <p class="text-dark text-xs w-full text-left">Geburtsdatum</p>
      <input bind:value={newItemDate} type="month" class=" w-full mb-1" />
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
