<template>
  <q-page padding>
    <div class="container">
      <q-tabs color="secondary" inverted align="justify">
        <q-tab default name="parent" slot="title" icon="far fa-id-card" label="Registro familiar" />
        <q-tab default name="edit-parent" slot="title" icon="fas fa-address-card" label="Editar persona" />
        <q-tab-pane name="parent">
          <div class="title">
            <h4></h4>
          </div>
          <parents-component ref="parentsComponent">
          </parents-component>
          <div class="text-center padding">
            <q-btn loader @click="registerParent" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
          </div>
        </q-tab-pane>
      </q-tabs>
      <div class="bottom"></div>
      <q-btn round icon="fas fa-child" to="child" color="deep-orange" label="Registrar menor">
        <q-tooltip>Registrar menor</q-tooltip>
      </q-btn>
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
    clearValues: function () {
      for (var i in this.fields) {
        this.fields[i] = null
        this.errors = []
      }
    },
    registerParent () {
      console.log(this.$refs['parentsComponent'].parentsfields)
      this.$axios.post('/parents/', this.$refs['parentsComponent'].parentsfields).then(response => {
        this.clearValues()
        this.$root.alertNotify('positive', 'Registro ingresado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          for (var i in this.$refs['parentsComponent'].parentsfields) {
            this.$refs['parentsComponent'].errors[i] = ''
          }
          this.$refs['parentsComponent'].errors = error.response.data
        }
      })
    }
  }
}
</script>

<style>
</style>
