<template>
  <header-block />
  <router-view />
</template>

<script>
import HeaderBlock from '@/components/Header'

export default {
  name: 'App',
  components: {
    HeaderBlock
  }
}
</script>

<style>
@import '@/assets/css/syles.css';
</style>
