<template>
    <div class="container">
        <div class="row gy-3">
            <div class="column-box col-lg-4">
                <div class="border rounded p-3">
                    <h3>Portfolio Value: {{ portfolio_value }} $USD</h3>
                    <AssetsList v-bind:portfolio_currencies="portfolio_currencies" @update-amount="updateAmount" />
                </div>
            </div>
            <div class="column-box col-lg-5">
                <PortfolioChart :chart_data="chart_data" />
            </div>
        </div>
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
            portfolioValue = portfolioValue.toFixed(2)
            return portfolioValue
        },
        async updateAmount() {
            this.portfolio_value = await this.updatePortfolioValue()
        }
    },
    data() {
        return {
            portfolio_currencies: [
                { name: "bitcoin", amount: 0.1 },
                { name: "ethereum", amount: 2 },
                { name: "usd", amount: 1500 }
            ],
            portfolio_value: 0,
        }
    },
}

</script>