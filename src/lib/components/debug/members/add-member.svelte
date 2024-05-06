<script lang="ts">
    import Button from '$lib/components/button.svelte';
    import { createEventDispatcher } from 'svelte';
    let newItemName = '';
    let newItemDate = new Date();

    const dispatch = createEventDispatcher();

    let list: {
        text: string;
        date: undefined | Date;
    }[] = [{ text: 'member 1', date: undefined }];

    function addToList() {
        list = [...list, { text: newItemName, date: newItemDate }];
        newItemName = '';
        newItemDate = new Date();
        dispatch('change', {
			list
		});
    }

    function removeFromList(index: number) {
        list.splice(index, 1);
        list = list;
        dispatch('change', {
			list
		});
    }
</script>

{#each list as item, index}
    <div class="flex border-2 justify-between p-2 rounded-2xl mb-1 bg-white">
        <span>{item.text}</span>
        <span>{item.date}</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class='border-2 px-2 rounded-full cursor-pointer hover:bg-gray hover:text-white' on:click={() => removeFromList(index)}>&times;</span>
    </div>
{/each}
<div class="flex flex-col gap-1 items-center justify-center mt-4 w-full">
    <input bind:value={newItemName} type="text" placeholder="new member name.." class=" w-full my-1" />
    <input bind:value={newItemDate} type="date" class=" w-full my-1" />
    <Button on:click={addToList} class="bg-dark">Hinzufügen</Button>
</div>
