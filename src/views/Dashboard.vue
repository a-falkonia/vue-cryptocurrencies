<template>
  <div class="container">
    <div class="row gy-3">
      <div class="column-box col-lg-4">
        <div class="border rounded">
          <Converter v-bind:coinsData="coinsData" @selected-currency="updateSelectedCoin" />
          <Description :key="selectedCoin" v-bind:selectedCoin="selectedCoin"/>
          <List v-bind:coinsData="coinsData" />
        </div>
      </div>
      <div class="column-box col-lg-8">
        <div class="border rounded">
          <Suspense>
            <RatesChart v-bind:coins_id="coins_id" />
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import Description from '@/components/Description';
import Converter from "@/components/Converter";
import RatesChart from "@/components/RatesChart";
export default {
  name: "App",

  components: {
    Converter,
    Description,
    List,
    RatesChart,
  },
  data() {
    return {
      coins_id: ["bitcoin", "ethereum"],
      coinsData: [],
      selectedCoin:"bitcoin"
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
  methods: {
    updateSelectedCoin(currencyName) {
      for (const coin of this.coinsData) {
        if (coin.name == currencyName) {
          this.selectedCoin = coin.name.toLowerCase()
          console.log("Dashboard selected coin", this.selectedCoin)
        
        }
      }
    }
  }
};
</script>
<style>
.column-box {
  padding: 16px;
}
</style>
