<template>
  <q-page padding>
    <div class="container">
     <div class="title">
        <h4>Registro Padres</h4>
      </div>
      <parents-component ref="parentsComponent">
      </parents-component>
      <div class="text-center padding">
        <q-btn loader @click="registerParent" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
      </div>
      <div class="bottom"></div>
    </div>
  </q-page>
</template>

<script>
import ParentsComponent from 'components/People/Parents.vue'
export default {
  name: 'Parents',
  components: {
    ParentsComponent
  },
  data () {
    return {
    }
  },
  methods: {
    registerParent () {
    }
  }
}
</script>

<style>
</style>
