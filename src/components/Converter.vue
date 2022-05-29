<template>
  <div class="px-3 pt-3">
    <div class="pb-3">
      <select class="select-coin" @change="updateInputs" v-model="selected">
        <option v-for="coin in coinsData">{{ coin.name }}</option>
      </select>
    </div>
    <div class="d-flex flex-row">
      <div class="">
        <template v-for="coin in coinsData">
          <template v-if="selected === coin.name" v-model="selected">
            <img :src="coin.image.small" class="me-3" width="36" height="36" />
            <h2>{{ coin.name }}</h2>
            <p>Rate: ${{ coin.market_data.current_price.usd }}</p>
            <div>
              <input class="converter-input" id="currencyInput" @keyup="calc_usd" :value="currency_input" />
              <span>{{ coin.symbol }}</span>
            </div>
          </template>
        </template>
      </div>
      <div class="">
        <img src="@/assets/dollar-symbol.png" class="me-3" width="36" height="36" />
        <h2>USD</h2>
        <p>Rate: $1</p>
        <div>
          <input class="converter-input" id="currencyInput" @keyup="calc_currency" :value="usd_input" />
          <span>usd</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coinsData"],
  data() {
    return {
      selected: "Bitcoin",
      selectedCoinRate: 0,
      currency_input: "",
      usd_input: "",
      currencyInputSelected: true,
    }
  },
  methods: {
    calc_usd: function (e) {
      this.currencyInputSelected = true;
      this.calculate(e)
    },
    calc_currency: function (e) {
      this.currencyInputSelected = false;
      this.calculate(e)
    },
    updateInputs: function () {
      this.$emit("selected-currency", this.selected)
      this.usd_input = "";
      this.currency_input = "";
  
      if (this.selectedCoinRate == 0) {
        this.selectedCoinRate = this.coinsData[0].market_data.current_price.usd
      }
      for (var i = 0; i < this.coinsData.length; i++) {
        if (this.selected == this.coinsData[i].name) {
          var selected = this.coinsData[i];
          this.selectedCoinRate = selected.market_data.current_price.usd;
        }
      }

    },
    calculate: function (e) {
      this.updateInputs();
      var value = parseFloat(e.target.value);
      if (isNaN(value)) {
        this.usd_input = "";
        this.currency_input = "";
        return;
      }
      if (this.currencyInputSelected) {
        this.currency_input = value
        this.usd_input = (value * this.selectedCoinRate).toFixed(2)
      } else {
        this.usd_input = value
        this.currency_input = (value / this.selectedCoinRate).toFixed(2)
      }
    }
  }
};
</script>

<style scoped>
.converter-input {
  width: 70%;
  margin-right: 5px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #CCC;
  padding-left: 10px;
}
</style>
