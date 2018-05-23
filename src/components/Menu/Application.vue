<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
    <q-list-header class="submenu-header">Contenido</q-list-header>
    <q-item  :to="{ name: 'parents' }">
      <q-item-side icon="fas fa-id-badge" />
      <q-item-main label="Registro Responsable" sublabel="Familiar del menor" />
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'ApplicationMenu',
  data () {
    return {}
  }
}
</script>

<style>
</style>
