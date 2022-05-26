<template>
  <tr key="coin.id">
    <td class="text-muted">{{ index + 1 }}</td>
    <td>
      <img :src="coin.image.small" style="width: 2rem" class="me-3" />
      <span>
        {{ coin.name }}
      </span>
    </td>
    <td>{{ coin.market_data.current_price.usd }} $</td>
  </tr>
</template>

<script>

export default {
    name: 'App',
    props: {
        coin: {
            type: Object,
            required: true
        },
        index: {
            type: Number,

        }
    }
}
</script>

<style>
tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>