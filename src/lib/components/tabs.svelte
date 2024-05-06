<script lang="ts">
    import { Accordion, Tabs } from 'bits-ui';
    import Dashboard from './dashboard.svelte';
    import type { Statistics } from '$lib/types';
    import StatisticsTable from './statistics-table.svelte';
    import { slide } from 'svelte/transition';
    import Icon from '@iconify/svelte';
    import { formatNumber } from '$lib/utils/format-number';

    export let statistics: Statistics;

    const tabs: { label: string; value: string }[] = [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Kennzahlen', value: 'numbers' },
        { label: 'Liquiditäts&shy;entwicklung', value: 'liquidity' },
    ];

    $: metrics = [
        {
            label: 'Berechnung für Zusagedatum',
            value: new Date(statistics.commitmentDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
        },
        { label: 'Mitarbeiteranzahl', value: formatNumber(statistics.employeeCount) },
        {
            label: 'Durchschnittsalter',
            value: statistics.averageAge,
            infoTooltip: 'Bei dieser Modellrechnung kann je nach Anzahl der Mitarbeiter das Durchschnittsalter von Ihrer Angabe abweichen.',
        },
        { label: 'Zusagezins', value: `${formatNumber(statistics.commitmentInterest * 100)} %` },
        { label: 'Unternehmenssteuersatz', value: `${formatNumber(statistics.companyTaxRate * 100)} %` },
        // { label: 'Break-Even-Verzinsung', value: `${formatNumber(statistics.breakEvenInterest * 100)} %` },
        { label: 'Verwendeter Anlagezins', value: `${formatNumber(statistics.investmentInterest * 100)} %` },
        { label: 'Versorgungsvolumen für alle Mitarbeiter', value: formatNumber(statistics.supplyVolume) },
    ];

    $: liquidityDevelopment = [
        { label: '... nach 5 Jahren', value: `${formatNumber(statistics.after5)} €` },
        { label: '... nach 10 Jahren', value: `${formatNumber(statistics.after10)} €` },
        { label: '... nach 20 Jahren', value: `${formatNumber(statistics.after20)} €` },
        { label: '... nach 30 Jahren', value: `${formatNumber(statistics.after30)} €` },
        { label: '... nach 40 Jahren', value: `${formatNumber(statistics.after40)} €` },
    ];

    const tabsContentStyle = 'h-fit border !border-t-0 border-border rounded-b-md';

    const accordionTriggerStyle =
        'flex w-full items-center justify-between py-3 px-[15px] transition-all bg-border/50 border-b border-border group-last:!border-0';
</script>

<!-- desktop as tabs -->
<div class="pt-6 max-md:hidden">
    <Tabs.Root value="dashboard" class="text-dark text-sm ">
        <Tabs.List class="flex flex-row min-h-[41px] items-end">
            {#each tabs as tab}
                <Tabs.Trigger
                    value={tab.value}
                    class="bg-gray transition-all flex-grow border !border-b-0 data-[state=inactive]:bg-opacity-35 data-[state=active]:bg-white data-[state=inactive]:hover:bg-opacity-70 data-[state=active]:rounded-t-md data-[state=active]:py-2 py-1 h-fit border-border px-6 first:rounded-tl-md last:rounded-tr-md max-xl:h-[50px]"
                    >{@html tab.label}</Tabs.Trigger>
            {/each}
        </Tabs.List>
        <Tabs.Content value="dashboard" class={tabsContentStyle}>
            <Dashboard {statistics} />
        </Tabs.Content>
        <Tabs.Content value="numbers" class={tabsContentStyle}>
            <div class="p-8 w-full">
                <StatisticsTable rows={metrics} />
            </div>
        </Tabs.Content>
        <Tabs.Content value="liquidity" class={tabsContentStyle}>
            <div class="p-8 w-full flex flex-col gap-4">
                <p class="opacity-60">bei einem Anlagezins von 3% für Liquidität im Unternehmen</p>
                <StatisticsTable rows={liquidityDevelopment} />
            </div>
        </Tabs.Content>
    </Tabs.Root>
</div>

<!-- mobile as accordion-->
<Accordion.Root class="md:hidden rounded-md overflow-hidden border border-border text-sm  mx-[20px] sm:mx-[30px] md:mx-0">
    {#each tabs as tab, i}
        <Accordion.Item value={tab.value} class="group">
            <Accordion.Header>
                <Accordion.Trigger class={accordionTriggerStyle}>
                    <p>{@html tab.label}</p>
                    <Icon icon="ph:caret-down" class="group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content transition={slide} transitionConfig={{ duration: 200 }}>
                {#if i === 0}
                    <Dashboard {statistics} />
                {:else if i === 1}
                    <div class="p-4 w-full">
                        <StatisticsTable rows={metrics} />
                    </div>
                {:else if i === 2}
                    <div class="p-4 w-full flex flex-col gap-4">
                        <p class="opacity-60">bei einem Anlagezins von 3% für Liquidität im Unternehmen</p>
                        <StatisticsTable rows={liquidityDevelopment} />
                    </div>
                {/if}
            </Accordion.Content>
        </Accordion.Item>
    {/each}
</Accordion.Root>
