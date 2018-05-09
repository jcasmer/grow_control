<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
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
      <q-list-header class="menu-header">Menú de navegación</q-list-header>
      <q-list
        no-border
        link
        inset-delimiter
      >
      <div>
        <q-list-header class="submenu-header">Maestros</q-list-header>
        <q-item  :to="{ name: 'diagnostic' }">
          <q-item-side icon="fas fa-stethoscope" />
          <q-item-main label="Diagnósticos" sublabel="" />
        </q-item>
        <q-item  :to="{ name: 'advice' }" exact>
          <q-item-side icon="fas fa-book" />
          <q-item-main label="Recomendaciones" sublabel="por diagnóstico" />
        </q-item>
        <q-item  :to="{ name: 'relationship' }" exact>
          <q-item-side icon="fas fa-handshake" />
          <q-item-main label="Parentescos" sublabel="" />
        </q-item>
      </div>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer reveal v-if="$q.theme === 'ios'">
      <nav-tabs />
    </q-layout-footer>
      <div class="footer">
        Copyright © 2018 Medellín-Colombia
      </div>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false,
      hideRoute: true
    }
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
</style>
