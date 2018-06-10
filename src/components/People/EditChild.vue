<template>
  <div class="container">
    <div class="row xl-gutter form-group">
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
      <div class="row xl-gutter form-group" v-show="idChild !== null">
        <childs-component ref="childComponent">
        </childs-component>
        <div class="padding text-right">
          <q-btn loader @click="deleteChild" color="negative">Eliminar<span slot="loading">Procesando...</span></q-btn>
        </div>
        <div class="padding text-left">
          <q-btn loader @click="editChild" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildsComponent from 'components/People/Childs.vue'
export default {
  name: 'EditChildComponent',
  components: {
    ChildsComponent
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
    setValue: function (value) {
      // this.$refs['childComponent']errors = []
      this.$refs['childComponent'].childsfields = value[0]
    },
    searchChild () {
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
          this.setValue(response.data)
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
  }
}
</script>

<style>
</style>
