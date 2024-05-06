<script lang="ts">
    export let value: string | undefined | null;
    export let type: 'text' | 'email' = 'text';
    export let error: string[] | undefined = undefined;
    export let placeholder: string = '';
    export let required = false;

    const setInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        value = e.currentTarget.value;
    };
</script>

<div class="w-full flex flex-col items-start">
    <input
        {value}
        {type}
        {placeholder}
        {required}
        on:input={setInput}
        class="w-full bg-gray border-transparent bg-opacity-35 focus:border-dark focus:outline-none focus:ring-0 placeholder:text-dark/60 text-sm" />
    <p class={`${error ? 'visible' : 'hidden'} text-xs text-red-600 mt-2`}>
        {error?.join(', ')}
    </p>
</div>
