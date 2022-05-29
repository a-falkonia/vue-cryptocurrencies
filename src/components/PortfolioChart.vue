<template>
  <div>
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
          position: 'top',
        },
        title: {
          display: true,
          text: 'Portfolio Chart'
        },
      },
    });

    const testData = computed(() => ({
      labels: ["ethereum", "bitcoin", "usd"],
      datasets: [
        {
          data: data.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
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