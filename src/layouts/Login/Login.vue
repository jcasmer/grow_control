<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header >
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>Crecimiento y Desarrollo
          <div slot="subtitle"></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="footer">
      Copyright © 2018 Medellín-Colombia
    </div>
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

<style>
.menu-header {
  font-weight: bold;
  font-size: 15px;
  color: black;
}
.submenu-header {
  font-weight: bold;
  color: black;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px;
  font-size: 12px;
  text-align: center;
  background: #027be3;
  color: white;
}
.bottom{
  margin-bottom: 40px;
  visibility: hidden;
}
h4{
  color: black;
  font-weight: 400;
  line-height: 0;
  position: relative;
}
</style>
