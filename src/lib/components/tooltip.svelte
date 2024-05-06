<script lang="ts">
    import { Tooltip } from 'bits-ui';
    import { fly } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    export let tooltipText: string | undefined;
    export let triggerStyle = 'rounded-full';
    export let contentStyle = '';
    export let sideOffset: number = 8;

    const conctentClass = twMerge(
        'shadow-md border border-gray bg-white px-3 py-[5px] text-sm font-xs outline-none rounded-md min-w-[90px]',
        contentStyle,
    );
</script>

<Tooltip.Root openDelay={0} closeOnPointerDown={false}>
    <Tooltip.Trigger class={triggerStyle}>
        <slot name="trigger" />
    </Tooltip.Trigger>
    {#if tooltipText}
        <Tooltip.Content transition={fly} transitionConfig={{ y: 8, duration: 150 }} {sideOffset} class={conctentClass}>
            <Tooltip.Arrow class="rounded-[2px] !bg-white border-l border-t border-gray" />
            <p class="text-center">{tooltipText}</p>
        </Tooltip.Content>
    {/if}
</Tooltip.Root>
