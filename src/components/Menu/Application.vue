<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
    <q-list-header class="submenu-header"></q-list-header>
    <q-item  :to="{ name: 'diagnostic' }">
      <q-item-side icon="fas fa-stethoscope" />
      <q-item-main label="Diagnósticos" sublabel="" />
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
