<template>
<div class="list-group list-group-flush">
    <ListItem v-for="(coin, index) in coinsData" v-bind:coin="coin" v-bind:index="index" />
</div>
</template>

<script>
import ListItem from '@/components/ListItem'
export default {
  name: 'App',
  data() {
    return {
      titles: ["#", "Coin", "Price"],
    }
  },
  components: {
    ListItem,
  },
  props: ['coinsData']
}
</script>
