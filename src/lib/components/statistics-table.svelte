<script lang="ts" context="module">
    export interface StatisticsTableRow {
        label: string;
        value: string | number;
        infoTooltip?: string;
    }
</script>

<script lang="ts">
    import Icon from '@iconify/svelte';
    import Tooltip from '$lib/components/tooltip.svelte';

    export let rows: StatisticsTableRow[];
</script>

<table class="w-full text-sm">
    <tbody class="divide-y divide-gray/50">
        {#each rows as row}
            <tr class=" divide-x divide-gray/50">
                <!-- label -->
                <td class="py-1 flex gap-[3px] items-center">
                    <p>{row.label}</p>
                    {#if row.infoTooltip}
                        <Tooltip tooltipText={row.infoTooltip} contentStyle="max-w-[300px] text-xs" sideOffset={1}>
                            <Icon slot="trigger" icon="clarity:info-solid" class="text-xl" />
                        </Tooltip>
                    {/if}
                </td>

                <!-- value -->
                <td class="text-right">{row.value}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    td {
        padding: 8px 13px;
    }
</style>
