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
    <div v-show="idChild != null">
       <read-only-child-component ref="readonlyChildComponent">
        </read-only-child-component>
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
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style>
</style>
