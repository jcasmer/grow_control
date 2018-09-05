<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
    <q-list-header class="submenu-header">Contenido</q-list-header>
    <q-item  :to="{ name: 'parents' }" v-show="register">
      <q-item-side icon="fas fa-id-badge" />
      <q-item-main label="Registro Responsable" sublabel="Familiar del menor" />
    </q-item>
    <q-item  :to="{ name: 'childs' }" v-show="register">
      <q-item-side icon="fas fa-child" />
      <q-item-main label="Registro Menor" sublabel="" />
    </q-item>
    <q-item  :to="{ name: 'controlchilds' }">
      <q-item-side icon="fas fa-weight" />
      <q-item-main label="Control Menor" sublabel="" />
    </q-item>
  </q-list>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'ApplicationMenu',
  data () {
    return {
      register: false
    }
  },
  created () {
    let group = LocalStorage.get.item('groups')
    if (typeof group !== 'undefined' && group !== null) {
      if (String(group).toLowerCase() === 'registro información' || String(group).toLowerCase() === 'administrador') {
        this.register = true
      }
    }
  }
}
</script>

<style>
</style>
