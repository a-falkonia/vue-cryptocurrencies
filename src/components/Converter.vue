<template>
  <div class="container">
      <div class="row">
        <div>
          <h2 class="title">CryptoCurrency Converter</h2>
        </div>
        <div>
          <select class="select-coin" @change="updateInputs" v-model="selected">
            <option v-for="coin in coinsData">{{ coin.name }}</option>
          </select>
        </div>
      </div>
      <div class="converter-box">
        <!-- input field cryptocurrency -->
        <div>
          <template v-for="coin in coinsData">
            <template v-if="selected === coin.name" v-model="coinRate">
              <img class="coin-img" :src="coin.image.small" />
              <h2 class="coin-name">{{ coin.name }}</h2>
              <p class="">Rate: {{ coin.market_data.current_price.usd }} $USD</p>
              <input
                class="currency-input"
                @keyup="calcInput_2"
                :value="calc1"
              /><span>{{coin.symbol}}</span>
            </template>
          </template>
        </div>
        <!-- input field USD -->
        <div>
          <img class="usd-img" src="@/assets/dollar-symbol-50.png" />
          <h2 class="coin-name">USD</h2>
          <p>Rate: 1 $USD</p>
          <input
            id="currencyInput"
            class="currency-input"
            @keyup="calcInput_1"
            :value="calc2"
          />
          <span>usd</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coinsData"],
  data(){
      return{
        selected: "Bitcoin",
		calc1: "",
		calc2: "",		
		firstInputSelected: true,
		input: document.getElementById("currencyInput"),
      }
  },
  methods: {
		calcInput_1: function(e, rate){
			this.firstInputSelected = true;
			this.calculate(e, rate);
		},
		calcInput_2: function(e, rate){
			this.firstInputSelected = false;
			this.calculate(e, rate);
		},
		updateInputs: function(){
			var selected;
			for(var i = 0; i < this.coinsData.length; i++){
				if(this.selected == this.coinsData[i].name){
					selected = this.coinsData[i];
				}
			}
			
			var input2 = parseFloat(document.getElementById("currencyInput").value);
			if(isNaN(input2)){
				this.calc2 = "";
				this.calc1 = "";
				return;
			}
			this.calc1 = (input2 * this.coinRate).toFixed(2);
		},
		calculate: function(e, value){
			var value = parseFloat(e.target.value);
			if(isNaN(value)){
				this.calc2 = "";
				this.calc1 = "";
				return;
			}
			
			if(this.firstInputSelected){
				this.calc2 = value;
				this.calc1 = (value / this.coinsData[0].market_data.current_price.usd).toFixed(2);
			} else {
				this.calc1 = value;
				this.calc2 = (value * this.coinsData[0].market_data.current_price.usd).toFixed(2);
			}
		}
	}
};
</script>

<style scoped>

.converter-box{
    display: flex;
    justify-content: center;
    border: 1px;
}
</style>
