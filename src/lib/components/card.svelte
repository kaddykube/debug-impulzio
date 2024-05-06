<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    let className = '';

    export { className as class };

    const style = twMerge('bg-white rounded-xl shadow-md dark:bg-verdiGray', className);
</script>

<div class={style}>
    <slot />
</div>
