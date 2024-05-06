<script lang="ts">
    import type { Statistics } from '$lib/types';
    import { formatNumber } from '$lib/utils/format-number';
    import Icon from '@iconify/svelte';

    export let statistics: Statistics;

    $: items = [
        {
            label: 'Max. Liquidität',
            value: `${formatNumber(statistics.maxLiquidity)} €`,
            icon: 'fa-solid:coins',
        },
        {
            label: 'Ø-Liquidität',
            value: `${formatNumber(statistics.averageLiquidity)} €`,
            icon: 'gala:file-document',
        },
        {
            label: 'Mtl. Gesamtbeitrag pro Mitarbeiter',
            value: `${formatNumber(statistics.employeeContribution)} €`,
            icon: 'ri:user-3-line',
        },
    ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 items-top p-8 lg:pt-24 max-w-[600px] mx-auto gap-x-12">
    {#each items as item}
        <div class="flex xs:flex-col items-center gap-y-2 xs:text-center">
            <Icon icon={item.icon} class="text-[40px] m-4" />
            <div>
                <p>{item.value}</p>
                <p>{item.label}</p>
            </div>
        </div>
    {/each}
</div>
