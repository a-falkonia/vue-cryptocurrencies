<template>
    <p>{{ currency.amount }} {{currency.name}} <input v-model.number="currency.amount" @change="$emit('amount-changed')" type="number"></p>
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