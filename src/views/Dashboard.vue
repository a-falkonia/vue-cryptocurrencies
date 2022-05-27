<template>
  <div>
    <h2>Dashboard</h2>
    <hr />
    <router-link to="/my-wallet">My Wallet</router-link>
    <Converter v-bind:coinsData="coinsData" />
    <List v-bind:coinsData="coinsData" />
    <Suspense><Chart v-bind:coins_id="coins_id"/></Suspense>
  </div>
</template>

<script>
import List from "@/components/List";
import Converter from "@/components/Converter";
import Chart from "@/components/Chart";
export default {
  name: "App",
  
  components: {
    Converter,
    List,
    Chart,
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
