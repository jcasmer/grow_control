<template>
  <div>
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
    <br>
    <div v-show="idChild !== null">
      <br>
      <childs-component ref="childComponent">
      </childs-component>
    </div>
    <q-alert color="tertiary" v-show="idChild !== null">
      Editar responsable
    </q-alert>
    <br>
    <div class="row xl-gutter" v-show="idChild !== null">
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Documento responsable" v-model="parentsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
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
        <q-btn loader @click="addParent" color="secondary">Añadir Responsable<span slot="loading">Procesando...</span></q-btn>
      </div>
      <div class="padding text-right">
        <q-btn round icon="fas fa-child" to="parents" color="deep-orange" label="Registrar menor">
          <q-tooltip>Ir a registro responsable</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="bottom"></div>
    <div class="row xl-gutter form-group" v-show="idChild !== null">
      <grid-table ref="table" v-show="urlTable!==''" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:urlParent="urlTable"
        v-bind:editUrl="editUrlTable" v-bind:visibleColumns="visibleColumns" v-bind:filterFields="filterFields"
        v-bind:urlDelete="urlDelete" v-bind:btnEdit="btnEdit"
      >
      </grid-table>
      <div class="bottom"></div>
      <div class="bottom"></div>
      <div class="row xl-gutter buttons">
        <div class="padding text-left">
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
import GridTable from 'components/Grid/table.vue'
export default {
  name: 'EditChildComponent',
  components: {
    ChildsComponent,
    GridTable
  },
  data () {
    return {
      document: null,
      idChild: null,
      errors: {
        document: null
      },
      columns: [
        { name: 'id', label: '#', field: 'id', sortable: true },
        { name: 'parent_document', label: 'Documento Responsable', field: 'parent_document', sortable: true },
        { name: 'parent', label: 'Responsable', field: 'parent', sortable: true },
        { name: 'relationship', label: 'Parentesco', field: 'relationship', sortable: true },
        { name: 'created_at', label: 'Fecha Creación', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['parent_document', 'parent', 'relationship', 'created_at'],
      filterFields: {
        'created_by__username__icontains': '',
        'created_at': '',
        'updated_at': '',
        'updated_by__username__icontains': ''
      },
      nameTable: 'Responsable(s) menor',
      urlTable: '',
      urlDelete: '/parents-childs/',
      editUrlTable: 'parents-childs/',
      btnEdit: false,
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
      parentId: null
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
    cleanField () {
      this.errors.document = null
      this.document = null
      this.idChild = null
      this.parentsfields.document = null
      this.parentsfields.name = null
      this.parentsfields.relationship = null
      this.errorsParents.document = null
      this.errorsParents.relationship = null
    },
    setValue: function (value) {
      this.$refs['childComponent'].childsfields = value[0]
      this.$refs['childComponent'].age = value[0].age
    },
    searchChild () {
      for (var i in this.$refs['childComponent'].childsfields) {
        this.$refs['childComponent'].errorsChildsFields[i] = ''
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
          this.setValue(response.data)
          this.idChild = response.data[0].id
          this.urlTable = '/parents-childs-full-data/'
          let filter = {
            child: this.idChild
          }
          this.$refs.table.url = this.urlTable
          this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: filter })
        } else {
          this.errors.document = null
          this.document = null
          this.idChild = null
          this.cleanField()
          this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
        }
      }).catch(error => {
        this.errors.document = null
        this.document = null
        this.idChild = null
        error = null
        this.cleanField()
        this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
      })
    },
    validateParents () {
      for (var i in this.$refs.table.serverData) {
        if (this.$refs.table.serverData[i].parent_document === this.parentsfields.document) {
          this.$root.alertNotify('negative', 'El documento: ' + this.parentsfields.document + ' ya se ingresó', 'red', '', 'top', 3000)
          return false
        }
      }
      return true
    },
    addParent (event, done) {
      if (!this.validateParents()) {
        return
      }
      this.$axios.get('/validate-parent/', {
        params: this.parentsfields
      }).then(response => {
        this.loading = true
        this.parentId = response.data.id
        if (this.parentId === null) {
          return
        }
        this.loading = false
        let parentChildParameters = {
          child: this.idChild,
          parent: this.parentId,
          relationship: this.parentsfields.relationship
        }
        let filter = {
          child: this.idChild
        }
        this.$axios.post('/parents-childs/', parentChildParameters).then(response => {
          this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: filter })
          this.$root.alertNotify('positive', 'Se ha registrado responsable exitosamente', 'green', '', 'top')
        }).catch(error => {
          if (error.response !== undefined) {
            for (var i in this.fields) {
              this.errorsParents[i] = ''
            }
            this.errorsParents = error.response.data
            this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: filter })
          }
        })
        this.parentsfields.document = null
        this.parentsfields.relationship = null
      }).catch(error => {
        for (var i in this.parentsfields) {
          this.errorsParents[i] = null
        }
        this.errorsParents = error.response.data
      })
    },
    editChild () {
      let dateBorn = this.$refs['childComponent'].childsfields.date_born
      this.$refs['childComponent'].childsfields.date_born = dateBorn != null && dateBorn !== '' ? String(dateBorn).substring(0, 10) : null
      let url = '/childs/' + this.idChild + '/'
      this.$axios.put(url, this.$refs['childComponent'].childsfields).then(response => {
        this.cleanField()
        this.$root.alertNotify('positive', 'Registro actualizado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          for (var i in this.$refs['childComponent'].childsfields) {
            this.$refs['childComponent'].errorsChildsFields[i] = ''
          }
          this.$refs['childComponent'].errorsChildsFields = error.response.data
          this.$root.alertNotify('negative', 'Se presentaron errores. Verifique campos', 'red', '', 'top')
        }
      })
    },
    deleteChild () {
      let deleteUrl = '/childs/' + this.idChild + '/'
      this.$q.dialog({
        title: '¿Eliminar registro?',
        message: 'Está seguro que desea eliminar este registro',
        ok: 'Aceptar',
        cancel: 'Cancelar'
      }).then(() => {
        this.$axios.delete(deleteUrl
        ).then(response => {
          this.cleanField()
          this.$root.alertNotify('positive', 'Se ha eliminado el registro exitosamente.', 'green', '', 'top')
        }).catch(error => {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 3000)
          } else {
            this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', '', 'top')
          }
        })
      }).catch(() => {
      })
    }
  },
  created () {
    this.cleanField()
    this.getRelationship()
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 15px;
}
</style>
