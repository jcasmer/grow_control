<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'App',
  methods: {
    alertNotify (type, message, color, icon, position, timeout) {
      if (timeout == null || timeout === 'undefined') {
        timeout = 2000
      }
      this.$q.notify({
        message: message,
        timeout: timeout,
        type: type,
        color: color,
        icon: icon,
        position: position
      })
    },
    validateSesion: function () {
      if (LocalStorage.get.item('is_superuser') === false || LocalStorage.get.item('is_superuser') === 'undefined' || LocalStorage.get.item('is_superuser') === null) {
        this.$router.push({path: '/login'})
        this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      }
    },
    removeStorage () {
      localStorage.clear()
    }
  }
}
</script>

<style>
</style>
