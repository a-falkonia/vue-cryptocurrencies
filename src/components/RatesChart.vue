<template>
  <div class="chart-container">
    <LineChart :chartData="data" />
  </div>
</template>

<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "App",
  components: { LineChart },

  async setup(props) {
    var chart_prices = [];
    var chart_dates = [];
    var coinAPIdata;
    // Fetching the chart data for each coin
    for (const coin of props.coins_id) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=14&interval=daily`
      );
      coinAPIdata = await response.json();
      let prices = [];
      for (const value of coinAPIdata.prices) {
        let [, price] = value;
        prices.push(price);
      }
      chart_prices[`${coin}`] = prices;
    }

    for (const value of coinAPIdata.prices) {
      let [timestamp] = value;
      let d = new Date(timestamp).toLocaleDateString("ru-RU");
      chart_dates.push(d);
    }

    const data = {
      labels: chart_dates,
      datasets: [
        {
          data: chart_prices["bitcoin"],
          label: "Bitcoin",
          tension: 0.1,
        },
        {
          data: chart_prices["ethereum"],
          label: "Ethereum",
          tension: 0.1,
        },
      ],
    };
    return { data };
  },
  props: ["coins_id"],
};
</script>

<style>
.chart-container {
  width: 50%;
  margin: auto;
}
</style>
