<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
    <q-list-header class="submenu-header">Administración</q-list-header>
    <!-- <q-item  :to="{ name: 'diagnostic' }">
      <q-item-side icon="fas fa-stethoscope" />
      <q-item-main label="Diagnósticos" sublabel="" />
    </q-item> -->
    <q-item  :to="{ name: 'advice' }" exact>
      <q-item-side icon="fas fa-notes-medical" />
      <q-item-main label="Recomendaciones" sublabel="por diagnóstico" />
    </q-item>
    <q-item  :to="{ name: 'relationship' }" exact>
      <q-item-side icon="fas fa-user-friends" />
      <q-item-main label="Parentescos" sublabel="" />
    </q-item>
    <q-item  :to="{ name: 'user' }" exact>
      <q-item-side icon="fas fa-users" />
      <q-item-main label="Usuarios" sublabel="" />
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'Masters',
  data () {
    return {}
  }
}
</script>

<style>
</style>
