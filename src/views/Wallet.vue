<template>
    <div>
        <h2>My Wallet</h2>
        <router-link to="/">Dashboard</router-link>
        <hr>
        <h3>You currently have:</h3>
        <AssetsList v-bind:wallet_currencies="wallet_currencies" @subtract-currency="subtractCurrency"
            @add-currency="addCurrency" />
    </div>
</template>
<script>
import AssetsList from '@/components/AssetsList'
export default {
    components: {
        AssetsList
    },
    methods: {
        subtractCurrency(currencyname) {
            for (const c of this.wallet_currencies) {
                if (c.name === currencyname) {
                    c.amount -= 1;
                }
            }
        },
        addCurrency(currencyname) {
            for (const c of this.wallet_currencies) {
                if (c.name === currencyname) {
                    c.amount += 1;
                }
            }
        }
    },
    data() {
        return {
            wallet_currencies: [
                { name: "btc", amount: 1 },
                { name: "eth", amount: 3 },
                { name: "usd", amount: 160 },
            ]
        }
    }
}
</script>