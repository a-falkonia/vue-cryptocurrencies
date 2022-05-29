<template>
<div class="px-3 pt-3">
    <p v-html="description"></p>
</div>
</template>
<script>
export default{
    props: {
        selectedCoin:{
            type: String,
            required: true
        }
    },
    data(){
        return {
            description: ""
        }
    },
    async mounted(){
        const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${this.selectedCoin}`
        );
        const currencyData = await response.json();
        const shortDescription = currencyData.description.en.split('. ', 1)[0] + "."
        this.description = shortDescription
    }
}
</script>