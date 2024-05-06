<script lang="ts">
    import Icon from '@iconify/svelte';

    export let label: string = '';
    export let value: number = 0;
    export let step: number = 1;
    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;

    let inputEl: HTMLInputElement;

    const setCounter = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        value = Number(e.currentTarget.value);
    };

    const onClickAdd = () => {
        inputEl.stepUp();
        inputEl.dispatchEvent(new Event('focusout'));
    };

    const onClickSubtract = () => {
        inputEl.stepDown();
        inputEl.dispatchEvent(new Event('focusout'));
    };
</script>

<div class="flex flex-col gap-y-1">
    <div class="text-dark text-xs flex gap-[5px]">
        <p>{label}</p>
    </div>
    <div class="relative w-full xs:max-w-[120px]">
        <!-- current amount -->
        <input
            lang="de"
            style="-moz-appearance:textfield;"
            bind:this={inputEl}
            name="amountCounter"
            type="number"
            bind:value
            {max}
            {min}
            {step}
            on:focusout={setCounter}
            class="[&::-webkit-inner-spin-button]:hidden focus:outline-none rounded-md border-gray w-full focus:border-dark focus:ring-dark" />

        <div
            class="h-[calc(100%-2px)] p-1.5 xs:p-0 min-w-[13px] absolute top-[1px] right-[1px] xs:border-l border-gray text-gray flex xs:flex-col max-xs:text-dark">
            <!-- add -->
            <button
                type="button"
                title="add + {step} to amount"
                on:click={onClickAdd}
                class="w-full h-full xs:h-[50%] aspect-square flex items-center justify-center disabled:cursor-not-allowed relative bg-white hover:brightness-95 max-xs:border-r xs:border-b border-gray xs:rounded-tr-[5px]">
                <Icon icon="ph:caret-up" class="max-xs:hidden" />
                <Icon icon="ph:plus" class="xs:hidden text-lg" />
            </button>

            <!-- subtract -->
            <button
                type="button"
                title="subtract - {step} of amount"
                on:click={onClickSubtract}
                class="w-full h-full xs:h-[50%] aspect-square flex items-center justify-center disabled:cursor-not-allowed bg-white hover:brightness-95 rounded-br-[5px]">
                <Icon icon="ph:caret-down" class="max-xs:hidden" />
                <Icon icon="ph:minus" class="xs:hidden text-lg" />
            </button>
        </div>
    </div>
</div>
