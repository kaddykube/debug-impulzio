<script lang="ts" context="module">
    const schema = z.object({
        name: z.string().min(1),
        company: z.string().min(1),
        email: z.string().email().min(1),
    });

    export type ContactSubmit = {
        data: z.infer<typeof schema>;
    };
</script>

<script lang="ts">
    import { z } from 'zod';
    import Button from '$lib/components/button.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import TextInput from './text-input.svelte';
    import { createEventDispatcher } from 'svelte';

    const formData = {
        name: '',
        company: '',
        email: '',
    };

    const { form, enhance, errors, allErrors } = superForm(formData, {
        id: 'contact',
        SPA: true,
        validators: zod(schema),
        taintedMessage: false,
        invalidateAll: false,
        resetForm: false,
        onUpdated: ({ form }) => {
            if (form.valid) {
                dispatch('submit', form);
            }
        },
    });

    const dispatch = createEventDispatcher<{ submit: ContactSubmit }>();
</script>

<form id="contact" method="POST" use:enhance class="flex flex-col gap-6 items-start max-w-[300px]">
    <TextInput bind:value={$form.name} placeholder={'Vor- und Nachname'} error={$errors.name} required />
    <TextInput bind:value={$form.company} placeholder={'Firma'} error={$errors.company} required />
    <TextInput bind:value={$form.email} placeholder={'E-Mail'} error={$errors.email} required type="email" />

    <Button type="submit" class="bg-dark mt-4">Angebot erstellen</Button>
</form>
