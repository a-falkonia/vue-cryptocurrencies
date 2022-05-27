<template>
    <p><button class="rm" v-on:click="$emit('subtract-currency', currency.name)">-1</button>{{ currency.amount }} {{ currency.name }}<button class="add" v-on:click="$emit('add-currency', currency.name)">+1</button></p>
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