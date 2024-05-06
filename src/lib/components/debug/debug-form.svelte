<script lang="ts">
    import Button from '$lib/components/button.svelte';
    import NumberInput from '$lib/components/number-input.svelte';
    import RangeSlider from '$lib/components/range-slider.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';

    const formData = {
        employeeContribution: 0,
        employerContribution: 0,
        companyTaxRate: 0,
        commitmentInterest: 0,
        investmentInterest: 0,
    };

    const { form, enhance, submit } = superForm(formData, {
        id: 'calculator',
        SPA: true,
        //validators: zod(LiquidityCalcParamsSchema),
        taintedMessage: false,
        invalidateAll: false,
        resetForm: false,
        onUpdated: async ({ form }) => {
            if (form.valid) {
                //const data = await calcLiquidity(form.data);
            }
        },
    });
</script>

    <form id="calculator" method="POST" use:enhance class="flex-col">
        <NumberInput bind:value={$form.companyTaxRate} label="Unternehmens&shy;steuersatz %" step={0.1} min={15} max={50} />
        <div class="flex w-full my-4">
            <NumberInput bind:value={$form.commitmentInterest} label="Zusagezins %" step={0.1} min={1} max={4} />
            <RangeSlider
                bind:value={$form.commitmentInterest}
                class="grow"
                step={0.1}
                min={1}
                max={4}
                tooltipText={`${$form.commitmentInterest}%`} />
        </div>
        <div class="flex w-full my-4">
            <NumberInput bind:value={$form.employeeContribution} label="Mtl. Arbeitnehmerbeitrag" step={1} min={0} max={350} />
            <RangeSlider
                bind:value={$form.employeeContribution}
                class="grow"
                min={0}
                max={350}
                step={1}
                tooltipText={`${$form.employeeContribution}€`} />
        </div>
        <div class="flex w-full my-4">
            <NumberInput bind:value={$form.employerContribution} label="Mtl. Arbeitgeberbeitrag" step={1} min={0} max={500} />
            <RangeSlider 
                bind:value={$form.employerContribution}
                class="grow"
                min={0}
                max={500}
                step={1}
                tooltipText={`${$form.employerContribution}€`} />
        </div>
        <div class="col-span-full flex flex-row gap-6 mt-4 justify-center">
            <Button type="submit" class="bg-dark">Berechnen</Button>
        </div>
    </form>
