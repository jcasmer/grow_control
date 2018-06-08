<template>
  <div>
    <div class="row xl-gutter">
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Documento familiar" v-model="parentsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
        <div class="lbl-error" v-if="errorsParents.document != 0 && errorsParents.document != null">
            {{ errorsParents.document[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.relationship" :options="selectRelationshipOptions" separator float-label="Parentesco"/>
        <div class="lbl-error" v-if="errorsParents.relationship != 0 && errorsParents.relationship != null">
            {{ errorsParents.relationship[0] }}
        </div>
      </div>
      <div class="padding text-left">
        <q-btn loader @click="addParent" color="secondary">Añadir familiar<span slot="loading">Procesando...</span></q-btn>
      </div>
      <div class="bottom"></div>
      <div class="col-12 padding">
        <q-table ref="tableParents"
          title="Familiar"
          :data="serverData"
          :columns="columns"
          row-key= "document"
          :loading="loading"
          :selection="selection"
          :selected.sync="selected"
          color="primary"
          separator = "horizontal"
        >
          <template slot="top-selection" slot-scope="props">
            <div class="col" />
            <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" tooltip="Eliminar registro(s) seleccionado">
              <q-tooltip>Eliminar registro(s) seleccionado(s)</q-tooltip>
            </q-btn>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildsParentsComponent',
  data () {
    return {
      parentsfields: {
        document: null,
        name: null,
        relationship: null
      },
      errorsParents: {
        document: null,
        relationship: null
      },
      selectRelationshipOptions: [],
      columns: [
        { name: 'document', label: 'Documento', field: 'document', sortable: true },
        { name: 'name', label: 'Nombre', field: 'name', sortable: true },
        { name: 'relationship', label: 'Parentesco', field: 'relationship', sortable: true }
      ],
      serverData: [],
      loading: false,
      selection: 'multiple',
      selected: []
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
        this.selectRelationshipOptions.push({value: null, label: ''})
        for (var data in values) {
          this.selectRelationshipOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    },
    validateParents () {
      for (var i in this.serverData) {
        if (this.serverData[i].document === this.parentsfields.document) {
          this.$root.alertNotify('negative', 'El documento: ' + this.parentsfields.document + ' ya se ingresó', 'red', '', 'top', 3000)
          return false
        }
      }
      return true
    },
    clearValues: function () {
      for (var i in this.parentsfields) {
        this.parentsfields[i] = null
        this.parentsfields.errors = []
      }
      for (var j in this.parentsfields) {
        this.errorsParents[j] = null
      }
    },
    addParent (event, done) {
      if (!this.validateParents()) {
        return
      }
      this.$axios.get('/validate-parent/', {
        params: this.parentsfields
      }).then(response => {
        this.loading = true
        this.serverData.push(response.data)
        this.loading = false
        this.clearValues()
      }).catch(error => {
        for (var i in this.parentsfields) {
          this.errorsParents[i] = null
        }
        this.errorsParents = error.response.data
      })
      this.loading = false
    },
    deleteRow () {
      for (var i in this.selected) {
        for (var ii in this.serverData) {
          if (this.selected[i].document === this.serverData[ii].document) {
            this.serverData.splice(ii, 1)
          }
        }
      }
      this.selected = []
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style scoped>
.bottom{
  margin-bottom: 50px;
  visibility: hidden;
}
</style>
