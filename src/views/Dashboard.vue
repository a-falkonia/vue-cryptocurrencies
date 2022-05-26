<template>
  <div>
    <h2>Dashboard</h2>
    <hr>
    <router-link to="/my-wallet">My Wallet</router-link>
    <Converter v-bind:coinsData="coinsData"/>
    <List v-bind:coinsData="coinsData" />
  </div>
</template>

<script>
import List from "@/components/List";
import Converter from "@/components/Converter"
export default {
  name: "App",
  data() {
    return {
      coins_id: ["bitcoin", "ethereum"],
      coinsData: [],
    };
  },
  components: {
    Converter,
    List,
},
  async mounted() {
    for (const coin of this.coins_id) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );
      const coinData = await response.json();
      console.log(coinData);
      this.coinsData.push(coinData);
    }
  },
};
</script>

