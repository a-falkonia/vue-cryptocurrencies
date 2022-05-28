<template>
    <div>
        <AssetsItem 
        v-for="currency of portfolio_currencies"
        v-bind:currency="currency"
        @amount-changed="updateAmount"/>
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
        updateAmount(currencyName) {       
            this.$emit('update-amount', currencyName)
        },
    },

}
</script>