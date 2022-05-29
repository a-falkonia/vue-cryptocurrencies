<template>
  <div class="pt-3 list-group-item">
    <div class="d-flex flex-row align-items-center">
      <div class="d-flex flex-row flex-grow-1">
        <img :src="coin.image.small" class="me-3" width="36" height="36" />
        <div>
          <h5>{{ coin.symbol.toUpperCase() }}</h5>
          {{ coin.name }}
        </div>
      </div>
      {{ coin.market_data.current_price.usd }} USD
    </div>
  </div>
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

