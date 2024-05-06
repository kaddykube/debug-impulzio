<script lang="ts">
    import { Dialog } from 'bits-ui';
    import { quintOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';

    export let open: boolean = true;
</script>

<Dialog.Root bind:open>
    <Dialog.Portal>
        <Dialog.Overlay transition={fade} transitionConfig={{ duration: 150 }} class="fixed inset-0 z-40 bg-dark bg-opacity-80" />
        <Dialog.Content
            transition={scale}
            transitionConfig={{ duration: 500, opacity: 0.5, start: 0.0, easing: quintOut }}
            class="fixed left-[50%] top-[50%] z-50 w-[94%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[800px] ">
            <slot />
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
