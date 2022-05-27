<template>
    <div>
        <AssetsItem 
        v-for="currency of portfolio_currencies"
        v-bind:currency="currency"
        @subtract-currency="subtractCurrency"
        @add-currency="addCurrency"/>
    </div>
</template>
<script>
import AssetsItem from '@/components/AssetsItem'
export default {
    components: {
        AssetsItem
    },
    props: {
        portfolio_currencies: {
            type: Array,
            required: true
        },
    },
    methods: {
        subtractCurrency(currencyName) {       
            this.$emit('subtract-currency', currencyName)
        },
        addCurrency(currencyName) {
            this.$emit('add-currency', currencyName)
        }
    },

}
</script>