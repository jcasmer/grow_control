<template>
  <q-page padding>
    <div class="row xl-gutter">
      <div class="col-lg-4 col-xs-6 padding">
        <q-input float-label="Documento" v-model="document" placeholder="Ingrese el documento" maxlength="20"/>
        <div class="lbl-error" v-if="errors.document != 0 && errors.document != null">
            {{ errors.document[0] }}
        </div>
      </div>
      <q-btn round color="secondary" size="md" @click="searchChild">
        <q-icon name="fas fa-search" />
        <q-tooltip>Buscar</q-tooltip>
      </q-btn>
    </div>
    <div class="bottom"></div>
    <div v-show="idChild != null">
      <q-alert color="tertiary">
        Información del menor
      </q-alert>
      <div class="bottom"></div>
      <read-only-child-component ref="readonlyChildComponent">
      </read-only-child-component>
      <div class="bottom"></div>
      <q-alert color="tertiary">
        Registro control
      </q-alert>
      <br>
      <div class="row xl-gutter">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Altura (cm)" v-model="controlFields.height" placeholder="Ingrese la altura (cm)" maxlength="5"/>
          <div class="lbl-error" v-if="errorsControlFields.height != 0 && errorsControlFields.height != null">
              {{ errorsControlFields.height[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Peso (kg)" v-model="controlFields.weight" placeholder="Ingrese el peso (kg)" maxlength="5"/>
          <div class="lbl-error" v-if="errorsControlFields.weight != 0 && errorsControlFields.weight != null">
              {{ errorsControlFields.weight[0] }}
          </div>
        </div>
        <q-btn color="primary" @click="registerControl">Guardar Control<span slot="loading">Procesando...</span></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import ReadOnlyChildComponent from 'components/People/ReadOnlyChilds.vue'
export default {
  name: 'ControlChild',
  components: {
    ReadOnlyChildComponent
  },
  data () {
    return {
      document: null,
      idChild: null,
      errors: {
        document: null
      },
      controlFields: {
        height: null,
        weight: null
      },
      errorsControlFields: {
        height: null,
        weight: null
      }
    }
  },
  methods: {
    getRelationship () {
      let parameters = {
        nopaginate: 'nopaginate',
        is_active: 'True',
        ordering: 'name'
      }
      this.$axios.get('/relationship/', {
        params: parameters
      }).then(response => {
        let values = response.data
        this.$refs['readonlyChildComponent'].selectRelationshipOptions.push({value: null, label: ''})
        for (var data in values) {
          this.$refs['readonlyChildComponent'].selectRelationshipOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    },
    searchChild () {
      for (var i in this.$refs['readonlyChildComponent'].childsfields) {
        this.$refs['readonlyChildComponent'].errorsChildsFields[i] = ''
      }
      if (this.document === null || this.document === '') {
        this.errors.document = ['Este campo no puede ser nulo.']
        this.idChild = null
        return
      }
      let parameters = {
        document: this.document,
        nopaginate: 'nopaginate',
        is_active: 1
      }
      this.$axios.get('/childs/', {
        params: parameters
      }).then(response => {
        this.errors.document = null
        if (response.data.length > 0) {
          console.log(response.data)
          this.$refs['readonlyChildComponent'].setValue(response.data)
          this.idChild = response.data[0].id
        } else {
          this.errors.document = null
          this.document = null
          this.idChild = null
          this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
        }
      }).catch(error => {
        this.errors.document = null
        this.document = null
        this.idChild = null
        error = null
        this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
      })
    },
    registerControl () {
      this.$axios.post('/childs-detail/', this.controlFields).then(response => {
        this.controlFields.height = null
        this.controlFields.weight = null
        this.$root.alertNotify('positive', 'Registro ingresado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 6000)
          }
          this.errorsControlFields = error.response.data
        }
      })
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style>
</style>
