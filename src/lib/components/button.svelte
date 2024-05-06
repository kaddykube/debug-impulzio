<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    let className = '';

    export { className as class };

    export let type: 'button' | 'submit' = 'button';

    const style = twMerge('rounded-full text-white py-3 px-10 active:scale-95 hover:brightness-110 transition-all', className);
</script>

<button {type} on:click class={style}>
    <slot />
</button>
