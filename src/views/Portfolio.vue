<template>
    <div>
        <h2>My Portfolio</h2>
        <router-link to="/">Dashboard</router-link>
        <hr>
        <h3>Your Portfolio Value is: {{ portfolio_value }} $USD</h3>
        <h3>You currently have:</h3>
        <AssetsList v-bind:portfolio_currencies="portfolio_currencies"
            @update-amount="updateAmount" />
        <PortfolioChart :chart_data="chart_data" />
    </div>
</template>

<script>
import AssetsList from '@/components/AssetsList'
import PortfolioChart from '@/components/PortfolioChart'
export default {
    components: {
        AssetsList,
        PortfolioChart,
    },
    async mounted() {
        this.portfolio_value = await this.updatePortfolioValue()
    },
    methods: {
        async updatePortfolioValue() {
            let portfolioValue = 0;
            let coinValues = [];

            for (const coin of this.portfolio_currencies) {
                if (coin.name != "usd") {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${coin.name}`
                    );
                    const coinData = await response.json();
                    let coinValue = coin.amount * coinData.market_data.current_price.usd;
                    coinValues.push(coinValue)
                    portfolioValue += coinValue
                }
                else if (coin.name === "usd") {
                    coinValues.push(coin.amount)
                    portfolioValue += coin.amount
                }
            }
            this.chart_data = coinValues
            return portfolioValue
        },
        async updateAmount(){
            this.portfolio_value = await this.updatePortfolioValue()
        }
    },
    data() {
        return {
            portfolio_currencies: [
                { name: "bitcoin", amount: 1 },
                { name: "ethereum", amount: 3 },
                { name: "usd", amount: 160 }
            ],
            portfolio_value: 0,
            chart_data: [10, 20, 30]
        }
    },
}

</script>