<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
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

        <q-toolbar-title>
          Crecimiento y Desarrollo
          <div slot="subtitle"></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :no-hide-on-route-change="hideRoute"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menú de navegación</q-list-header>
        <q-item  :to="{ name: 'diagnostic' }" exact>
          <q-item-side icon="fas fa-stethoscope" />
          <q-item-main label="Diagnósticos" sublabel="" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
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
</style>
