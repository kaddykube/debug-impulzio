<script lang="ts">
    import { Slider } from 'bits-ui';
    import { twMerge } from 'tailwind-merge';
    import Tooltip from './tooltip.svelte';

    let className = '';

    export { className as class };
    export let tooltipText: string | undefined = undefined;

    const style = twMerge('flex flex-col justify-end px-2 xs:px-4', className);

    export let value: number = 0;
    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;
    export let step: number | undefined = undefined;

    $: sliderValue = [value];
</script>

<div class={style}>
    <Slider.Root
        bind:value={sliderValue}
        bind:min
        bind:max
        bind:step
        let:thumbs
        onValueChange={(e) => (value = e[0])}
        class="relative flex w-full touch-none select-none items-center mb-[6px]">
        <span class="relative h-2 w-full grow overflow-hidden rounded-full bg-gray">
            <Slider.Range class="absolute h-full bg-dark" />
        </span>
        {#each thumbs as thumb}
            <Slider.Thumb {thumb} asChild let:builder>
                <button type="button" use:builder.action {...builder} class="h-[20px] rounded-full focus:outline-none">
                    <Tooltip {tooltipText}>
                        <div
                            slot="trigger"
                            class="bg-white border border-dark rounded-full w-[20px] h-[20px] cursor-pointer focus:outline-none">
                        </div>
                    </Tooltip>
                </button>
            </Slider.Thumb>
        {/each}
    </Slider.Root>
</div>
