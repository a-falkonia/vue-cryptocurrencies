<template>
  <div class="container">
    <div class="row gy-3">
      <div class="column-box col-lg-4">
        <div class="border rounded">
          <Converter v-bind:coinsData="coinsData" />
          <div class="px-3 pt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab, veniam rerum, ipsa quas rem incidunt debitis, mollitia accusamus tempore quia. Sint mollitia nostrum minima cum. Ipsum sit aliquam corrupti.
          </div>
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
<style>
.column-box {
  padding: 16px;
}
</style>
