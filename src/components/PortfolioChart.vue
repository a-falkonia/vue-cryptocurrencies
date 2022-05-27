<template>
    <DoughnutChart :chartData="data" />
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: "App",
    components: { DoughnutChart },

    async setup(props) {
        let chart_labels = []
        let chart_data = []
        for (let coin of props.portfolio) {
            chart_labels.push(coin.name)
            chart_data.push(coin.amount)
        }
        const data = {
            labels: chart_labels,
            datasets: [{
                label: 'My First Dataset',
                data: chart_data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };
        return { data };
    },
    props: {
        portfolio: {
            type: Object,
            required: true
        }
    }
};
</script>