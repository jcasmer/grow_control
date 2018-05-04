<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import axios from 'axios'
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
        this.$root.alertNotify('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      }
    },
    removeStorage () {
      localStorage.clear()
    }
  },
  created () {
    axios.defaults.baseURL = process.env.API
    axios.defaults.headers.common['Authorization'] = 'JWT ' + LocalStorage.get.item('token')
  }
}
</script>

<style>
.container{
  width: 90%;
  margin: auto;
}
.lbl-error {
  color: #ec2f2f !important;
}
.padding{
  padding: 0 10px
}
</style>
