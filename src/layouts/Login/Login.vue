<template>
  <q-layout>
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
export default {
  name: 'LayoutLogin',
  methods: {
    openURL
  }
}
</script>
<style scoped>
</style>
