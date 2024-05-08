<script lang="ts">
  import { Accordion } from "bits-ui";

  export let items:
    | {
        isManagement: boolean;
        birthDate: { year: number; month: number };
        employeeContribution: number;
        employerContribution: number;
        amountDeferredCompensation: number;
        amountEmployerContribution: number;
        text?: string | undefined;
      }[]
    | [] = [];
</script>

<Accordion.Root multiple class="w-full">
  {#each items as item, i}
    <Accordion.Item value={item.text ? item.text : ""} class="group   px-1.5">
      <Accordion.Header class="border-b border-dark-10">
        <Accordion.Trigger
          class="flex w-full flex-1 items-center justify-between py-5 text-[15px] font-medium transition-all [&>span]:rotate-180 [&[data-state=open]>span]:rotate-0 "
          >{item.text}
          <span
            class="inline-flex items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
            >^</span
          ></Accordion.Trigger
        >
      </Accordion.Header>
      <Accordion.Content>
        <div class="flex border-collapse flex-wrap gap-1 w-full pt-2">
          {#each Object.entries(item) as [title, value]}
            {#if title !== "text"}
              <div
                class="flex-col border-y-2 border-x-[1px] border-dark-10 rounded-lg text-center break-words overflow-hidden"
              >
                <div class="border-b-2"><p class="p-2 bg-gray">{title}</p></div>
                <p class="p-2">
                  {#if title !== "birthDate"}{value}{:else}{#each Object.entries(value) as [ k, v]}{v}{' '}{/each}{/if}
                </p>
              </div>
            {/if}
          {/each}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
