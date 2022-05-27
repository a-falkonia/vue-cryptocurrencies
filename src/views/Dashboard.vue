<template>
  <div>
    <h2>Dashboard</h2>
    <router-link to="/my-portfolio">My Portfolio</router-link>
    <hr />
    <Converter v-bind:coinsData="coinsData" />
    <List v-bind:coinsData="coinsData" />
    <Suspense><RatesChart v-bind:coins_id="coins_id"/></Suspense>
  </div>
</template>

<script>
import List from "@/components/List";
import Converter from "@/components/Converter";
import RatesChart from "@/components/RatesChart";
export default {
  name: "App",
  
  components: {
    Converter,
    List,
    RatesChart,
  },
  data() {
    return {
      coins_id: ["bitcoin", "ethereum"],
      coinsData: [],
    };
  },
  async mounted() {
    for (const coin of this.coins_id) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );
      const coinData = await response.json();
      this.coinsData.push(coinData);
    }
  },
};
</script>
