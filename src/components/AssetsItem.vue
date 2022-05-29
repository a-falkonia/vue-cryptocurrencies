<template>
    <div class="pt-3 d-flex flex-row flex-grow-1 justify-content-space-between align-items-baseline">
        <input class="portfolio-input" v-model.number="currency.amount" @change="$emit('amount-changed')" type="number"> 
        <div>{{ currency.name }}</div>
    </div>
</template>
<script>

export default {
    props: {
        currency: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
.portfolio-input {
    width: 30%;
    margin-right: 5px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #CCC;
    padding-left: 10px;
}
</style>