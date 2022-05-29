<template>
  <div class="chart-container">
    <LineChart :height="640" :chartData="data" :options="options" />
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: "App",
  components: { LineChart },

  async setup(props) {
    var chart_prices = [];
    var chart_dates = [];

    // Fetching the chart data for each coin
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${props.selectedCoin}/market_chart?vs_currency=usd&days=14&interval=hourly`
    );
    const coinAPIdata = await response.json();
    let timestamps = []
    for (const value of coinAPIdata.prices) {
      let [timestamp, price] = value;
      chart_prices.push(price);
      timestamps.push(timestamp);
    }

    var months_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (const timestamp of timestamps) {
      let d = new Date(timestamp)
      let date = d.getDate() + ' ' + (months_arr[d.getMonth()])
      chart_dates.push(date);
    }

    const data = {
      labels: chart_dates,
      datasets: [
        {
          data: chart_prices,
          label: "Rate",
          tension: 0.1,
          borderWidth: 1,
          borderColor: 'rgb(13,110,253)'
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            borderColor: 'rgba(255,255,255, 0.1)'
          },
          ticks: {
            display: true,
            color: 'rgba(0,0,0,0.3)',
            callback: function (val, index) {
              return index % 4 === 0 ? this.getLabelForValue(val) : '';
            },

          }
        },
        y: {
          grid: {
            display: true,
            color: 'rgba(0,0,0,0.1)',
            borderColor: 'rgb(255,255,255)',
          },
          ticks: {
            display: true,
            color: 'rgba(0,0,0,0.3)',

          },

        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: '',
          font: {
            color: 'rgb(0, 18, 58)',
            size: 16
          },
        }
      }
    };

    return { data, options };
  },

  props: {
    selectedCoin: {
      type: String,
      required: true
    }
  },
};
</script>
<style scoped>
.chart-container {
  margin-top: -30px;
  height: 560px;
}
</style>