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
            <q-btn round color="secondary" size="md" @click="searchParent">
              <q-icon name="fas fa-search" />
              <q-tooltip>Buscar</q-tooltip>
            </q-btn>
          </div>
          <br><br>
          <div v-show="idParent !== null">
            <parents-component ref="editParentsComponent">
            </parents-component>
            <div class="text-center padding">
              <q-btn loader @click="editParent" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
            </div>
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
    searchParent () {
      console.log()
      if (this.document === null || this.document.trim() === '') {
        this.errors.document = ['Este campo no puede ser nulo.']
        this.idParent = null
        return
      }
      let parameters = {
        document: this.document,
        nopaginate: 'nopaginate',
        is_active: 1
      }
      this.$axios.get('/parents/', {
        params: parameters
      }).then(response => {
        this.errors.document = null
        if (response.data.length > 0) {
          this.$refs['editParentsComponent'].setValue(response.data)
          this.idParent = response.data[0].id
        } else {
          this.errors.document = null
          this.document = null
          this.idParent = null
          this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
        }
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
      let url = '/parents/' + this.idParent + '/'
      console.log(url, this.idParent)
      this.$axios.put(url, this.$refs['editParentsComponent'].parentsfields).then(response => {
        this.errors.document = null
        this.document = null
        this.idParent = null
        this.$root.alertNotify('positive', 'Registro actualizado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          for (var i in this.$refs['editParentsComponent'].parentsfields) {
            this.$refs['editParentsComponent'].errors[i] = ''
          }
          this.$refs['editParentsComponent'].errors = error.response.data
        }
      })
    }
  }
}
</script>

<style>
</style>
