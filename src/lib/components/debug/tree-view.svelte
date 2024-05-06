<script context="module" lang="ts">
    export interface TreeItem {
        name: string | number;
        children?: TreeItem[];

        // To allow custom keys
        [key: string]: any;
    }

    export type TreeData = TreeItem[];
</script>

<script lang="ts">
    import { Accordion } from 'bits-ui';
    import TreeViewItem from './tree-view-item.svelte';

    export let tree_data: TreeData = [];
</script>

<Accordion.Root multiple class="w-full">
    {#each tree_data as item, i}
        {#if !item.children}
            <!-- MONATE -->
            <Accordion.Item value={item.name ? item.name.toString() : ''} class="group   px-1.5">
                <Accordion.Header class="border-b border-dark-10">
                    <Accordion.Trigger
                        class="flex w-full flex-1 items-center justify-between py-5 text-[15px] font-medium transition-all [&>span]:rotate-180 [&[data-state=open]>span]:rotate-0 "
                        >{item.name}
                        <span class="inline-flex items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                            >^</span
                        ></Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                    <TreeViewItem {item}></TreeViewItem>
                </Accordion.Content>
            </Accordion.Item>
        {:else}
            {#if item.cols}
                <!-- JAHR -->
                <div class="py-4">{item.cols.name}</div>
                <Accordion.Item value={item.cols.name ? item.cols.name.toString() : ''} class="group px-1.5">
                    <TreeViewItem item={item.cols}></TreeViewItem>
                </Accordion.Item>
            {/if}
            <Accordion.Item value={item.name ? item.name.toString() : ''}>
                <Accordion.Header class="border-b border-dark-10">
                    <Accordion.Trigger
                        class="flex w-full flex-1 items-center justify-between py-5 text-[15px] font-medium transition-all [&>span]:rotate-180 [&[data-state=open]>span]:rotate-0 "
                        >{item.name}
                        <span class="inline-flex items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                            >^</span
                        ></Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                    <Accordion.Item value={item.name ? item.name.toString() : ''} class="group  px-1.5">
                        <svelte:self tree_data={item.children} let:item let:list={tree_data} let:id={i}>
                            <slot {item} list={tree_data} id={i} />
                        </svelte:self>
                    </Accordion.Item>
                </Accordion.Content>
            </Accordion.Item>
        {/if}
    {/each}
</Accordion.Root>
