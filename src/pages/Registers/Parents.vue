<template>
  <q-page padding>
    <div class="container">
      <q-tabs color="secondary" inverted align="justify">
        <q-tab default name="parent" slot="title" icon="far fa-id-card" label="Registrar familiar" />
        <q-tab  name="edit-parent" slot="title" icon="fas fa-address-card" label="Editar persona" @click="cleanField" />
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
        <q-tab-pane name="edit-parent">
          <div class="title">
            <h4></h4>
          </div>
          <div class="row xl-gutter form-group">
            <div class="col-lg-4 col-xs-6 padding">
              <q-input float-label="Documento" v-model="document" placeholder="Ingrese el documento" maxlength="20"/>
              <div class="lbl-error" v-if="errors.document != 0 && errors.document != null">
                  {{ errors.document[0] }}
              </div>
            </div>
            <q-btn round color="secondary" size="md">
              <q-icon name="fas fa-search" />
              <q-tooltip>Buscar</q-tooltip>
            </q-btn>
          </div>
          <div v-if="idParent">
            <parents-component ref="parentsComponent">
            </parents-component>
            <div class="text-center padding">
              <q-btn loader @click="editParent" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
            </div>
          </div>
        </q-tab-pane>
      </q-tabs>
      <div class="bottom"></div>
      <q-btn icon="fas fa-child" to="child" color="deep-orange" label="Registrar menor">
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
      idParent: null,
      document: null,
      errors: {
        document: null
      }
    }
  },
  methods: {
    cleanField () {
      this.errors.document = null
      this.document = null
      this.idParent = null
    },
    clearValues: function () {
      for (var i in this.$refs['parentsComponent'].parentsfields) {
        this.$refs['parentsComponent'].parentsfields[i] = null
        this.$refs['parentsComponent'].parentsfields.errors = []
      }
    },
    setValue: function (value) {
      for (var form in this.$refs['parentsComponent'].parentsfields) {
        this.$set(this.$refs['parentsComponent'].parentsfields, form, value[form])
      }
    },
    searchParent () {
      let parameters = {
        document: this.document
      }
      this.$axios.get('/parents/', {
        params: parameters
      }).then(response => {
        console.log(response)
      }).catch(error => {
        this.errors.document = null
        this.document = null
        this.idParent = null
        error = null
        this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
      })
    },
    registerParent () {
      this.$refs['parentsComponent'].parentsfields['is_active'] = true
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
    },
    editParent () {
      this.$refs['parentsComponent'].parentsfields['is_active'] = true
      this.$axios.put('/parents/', this.$refs['parentsComponent'].parentsfields).then(response => {
        this.clearValues()
        this.$root.alertNotify('positive', 'Registro actualizado correctamente', 'green', '', 'top')
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
