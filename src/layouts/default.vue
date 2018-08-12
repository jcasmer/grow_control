<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header >
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Crecimiento y Desarrollo
          <div slot="subtitle"></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      behavior = "desktop"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :overlay="overlay"
      @mouseover="leftDrawerOpen = true"
      @mouseout="leftDrawerOpen = false"
    >
      <list-masters v-show="admin"></list-masters>
      <hr>
      <list-application></list-application>
      <hr>
      <q-item  :to="{ name: 'login' }" exact>
        <q-item-side icon="fas fa-sign-out-alt" />
        <q-item-main label="Cerrar Sesión" />
      </q-item>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="footer">
      Copyright © 2018 Medellín-Colombia
    </div>
  </q-layout>
</template>

<script>
import { openURL, LocalStorage } from 'quasar'
import ListMasters from 'components/Menu/Masters.vue'
import ListApplication from 'components/Menu/Application.vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false,
      overlay: true,
      admin: false
    }
  },
  components: {
    ListMasters,
    ListApplication
  },
  methods: {
    openURL
  },
  created () {
    this.$root.validateSesion()
    let group = LocalStorage.get.item('groups')
    if (typeof group !== 'undefined' && group !== null) {
      if (String(group).toLowerCase() === 'administrador') {
        this.admin = true
      }
    }
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
