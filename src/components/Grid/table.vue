<template>
  <q-table
    title="Table Title"
    :data="tableData"
    :columns="columns"
    row-key="name"
  />
</template>

<script>
export default {
  name: 'GrowTable',
  data () {
    return {}
  },
  props:{
  }
}
</script>

<style>
</style>
