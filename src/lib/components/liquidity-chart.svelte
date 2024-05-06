<script lang="ts">
    import type { LiquidityYear } from '$lib/types';
    import { formatNumber } from '$lib/utils/format-number';
    import { onMount } from 'svelte';

    export let data: LiquidityYear[];

    let ref: HTMLDivElement;

    const options = {
        chart: {
            type: 'area',
            foreColor: '#586D8C',
            toolbar: false,
            width: '100%',
            height: '100%',
            animations: {
                dynamicAnimation: {
                    enabled: false,
                },
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
        series: [
            {
                name: 'Freie Liquidität',
                data: data.map((x) => x.liquidity),
            },
            {
                name: 'Kapitalleistungen',
                data: data.map((x) => x.capitalPayment),
            },
        ],
        xaxis: {
            categories: data.flatMap((x) => x.year),
            tickAmount: Math.round(data.length / 3),
        },
        yaxis: {
            labels: {
                formatter: function (value: number) {
                    return formatNumber(value);
                },
            },
        },
        colors: ['#50C831', '#586D8C'],
        stroke: {
            width: 1,
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                opacityFrom: 1,
                opacityTo: 0.7,
                stops: [0, 100],
                colorStops: [],
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }: { series: number[][]; dataPointIndex: number; w: any }) {
                return `<div class="tooltip"><p>${w.globals.categoryLabels[dataPointIndex]}</p><p>${w.globals.seriesNames[0]}: <b>${formatNumber(Math.round(series[0][dataPointIndex]), 'long')}</b></p><p>${w.globals.seriesNames[1]}: <b>${formatNumber(Math.round(series[1][dataPointIndex]), 'long')}</b></p></div>`;
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        type: 'line',
                    },
                    stroke: {
                        width: 3,
                        opacity: 1,
                    },
                    fill: {
                        type: 'solid',
                        opacity: 1,
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value: number) {
                                return formatNumber(value);
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                        tickAmount: 6,
                    },
                    xaxis: {
                        tickAmount: Math.round(data.length / 5),
                    },
                    grid: {
                        show: false,
                    },
                },
            },
        ],
    };

    onMount(async () => {
        const module = await import('apexcharts');
        const ApexCharts = module.default;

        //window.ApexCharts = ApexCharts;

        const chart = new ApexCharts(ref, options);

        chart.render();
    });
</script>

<div bind:this={ref} class="w-full h-auto aspect-[12/10] sm:aspect-[16/10]" />
