<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header >
      <q-toolbar
        color="primary"
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

        <q-toolbar-title>
          Crecimiento y Desarrollo
          <div slot="subtitle"></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-white-3' : null"
      :no-hide-on-route-change="hideRoute"
    >
      <q-list-header class="menu-header" >Menú de navegación</q-list-header>
      <list-masters></list-masters>
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
import { openURL } from 'quasar'
import ListMasters from 'components/Menu/Masters.vue'
import ListApplication from 'components/Menu/Application.vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false,
      hideRoute: true
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
