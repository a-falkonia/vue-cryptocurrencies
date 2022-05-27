<template>
<table>
        <thead>
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <ListItem 
          v-for="(coin, index) in coinsData"
          v-bind:coin="coin"
          v-bind:index="index"
          />
        </tbody>
    </table>
</template>

<script>
import ListItem from '@/components/ListItem'
export default {
    name: 'App',
    data() {
        return{
        titles: ["#", "Coin", "Price"],
        }
    },
    components: {
    ListItem,
    },
    props: ['coinsData']
}
</script>
<style scoped>
table {
  background: lightgray;
  margin:auto;
  width: 30%
}
</style>
