<template>
    <div>
        <h2>My Portfolio</h2>
        <router-link to="/">Dashboard</router-link>
        <hr>
        <h3>Your Portfolio Value is: {{ portfolio_value }} $USD</h3>
        <h3>You currently have:</h3>
        <AssetsList v-bind:portfolio_currencies="portfolio_currencies" @subtract-currency="subtractCurrency"
            @add-currency="addCurrency" />
        <Suspense>
            <PortfolioChart v-bind:portfolio="portfolio_currencies" />
        </Suspense>
    </div>
</template>
<script>
import AssetsList from '@/components/AssetsList'
import PortfolioChart from '@/components/PortfolioChart';

export default {
    components: {
        AssetsList,
        PortfolioChart,
    },
    methods: {
        async subtractCurrency(currencyname) {
            for (const c of this.portfolio_currencies) {
                if (c.name === currencyname) {
                    c.amount -= 1;
                }
                this.portfolio_value = this.getPortfolioValue()
            }
        },
        async addCurrency(currencyname) {
            for (const c of this.portfolio_currencies) {
                if (c.name === currencyname) {
                    c.amount += 1;
                }
                this.portfolio_value = await this.getPortfolioValue()
            }
        },
        async getPortfolioValue() {
            let portfolioValue = 0;
            for (const coin of this.portfolio_currencies) {
                if (coin.name != "usd") {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${coin.name}`
                    );
                    const coinData = await response.json();
                    let coinValue = coin.amount * coinData.market_data.current_price.usd;
                    portfolioValue += coinValue
                }
                else if (coin.name === "usd") {
                    portfolioValue += coin.amount
                }
            }
            return portfolioValue
        }
    },
    data() {
        return {
            portfolio_currencies: [
                { name: "bitcoin", amount: 1 },
                { name: "ethereum", amount: 3 },
                { name: "usd", amount: 160 }
            ],
            portfolio_value: 0
        }
    },
    async mounted() {
        this.portfolio_value = await this.getPortfolioValue()
    }
}

</script>