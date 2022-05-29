<template>
  <div class="">
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { toRef } from 'vue'

export default defineComponent({
  name: 'App',
  components: { DoughnutChart },
  setup(props) {
    const data = toRef(props, 'chart_data');
    const doughnutRef = ref();

    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
        },
      },
    });

    const testData = computed(() => ({
      labels: ["bitcoin","ethereum","usd"],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#f8c470', '#123E6B', '#ebf2fa'],
        },
      ],
    }));

    return { testData, doughnutRef, options };
  },
  props : {
    chart_data : {
      type: Array,
      required: true
    }
  }
});
</script>