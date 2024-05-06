<script lang="ts">
    import Button from '$lib/components/button.svelte';
    import type { LiquidityCalcParams } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import ContactForm, { type ContactSubmit } from './contact-form.svelte';

    export let formData: LiquidityCalcParams;

    let page = 0;

    const dispatch = createEventDispatcher<{ close: void }>();

    const onClose = () => {
        dispatch('close');
    };

    const onNextPage = () => {
        page += 1;
    };

    const onSubmit = (e: CustomEvent<ContactSubmit>) => {
        let contactInfo = e.detail;

        // do something
        console.log(contactInfo);

        onNextPage();
    };
</script>

<div class="text-dark px-8 md:px-12 py-6 md:py-10 min-h-[420px] w-full flex flex-col gap-y-8">
    {#if page === 0}
        <h3 class=" text-2xl lg:text-3xl text-left lg:mb-8 uppercase">Sind die Zahlen korrekt?</h3>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 md:gap-y-4 text-left text-sm">
            <p>Mitarbeiteranzahl: {formData.employeeCount} Personen</p>
            <p>Unternehmenssteuersatz: {formData.companyTaxRate}%</p>
            <p>Zusagezins: {formData.commitmentInterest}%</p>
            <p>Durchschnittsalter: {formData.averageAge} Jahre</p>
            <p>Mtl. Arbeitnehmerbeitrag: {formData.employeeContribution}€</p>
            <p>Mtl. Arbeitgeberbeitrag: {formData.employerContribution}€</p>
            <p>Anlagezins Arbeitgeber: {formData.investmentInterest}%</p>
        </div>

        <Button on:click={onNextPage} class="bg-dark w-fit mt-2">Ja, die Zahlen sind korrekt</Button>

        <button on:click={onClose} class="text-left text-sm">Zahlen korrigieren</button>
    {:else if page === 1}
        <h3 class="text-3xl text-left mb-2 uppercase">Wir sind fast fertig</h3>
        <ContactForm on:submit={onSubmit} />
    {:else if page === 2}
        <div class="flex flex-col items-center gap-8 my-auto">
            <h3 class="text-3xl mb-2 uppercase text-center">Das Angebot ist unterwegs!</h3>
            <Button class="bg-green w-fit" on:click={onClose}>Schließen</Button>
        </div>
    {/if}
</div>
