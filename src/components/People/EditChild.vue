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
        <childs-component ref="childComponent">
        </childs-component>
    </div>
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
        { name: 'parent', label: 'Responsable', field: 'parent', sortable: true },
        { name: 'relationship', label: 'Parentesco', field: 'relationship', sortable: true },
        { name: 'created_at', label: 'Fecha Creación', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['parent', 'relationship', 'created_at', 'created_by', 'updated_at', 'updated_by'],
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
      btnEdit: false
    }
  },
  methods: {
    cleanField () {
      this.errors.document = null
      this.document = null
      this.idChild = null
    },
    setValue: function (value) {
      this.$refs['childComponent'].childsfields = value[0]
      this.$refs['childComponent'].age = value[0].age
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
    editChild () {
      let url = '/childs/' + this.idChild + '/'
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
    },
    deleteChild () {
      //  delete
    }
  },
  created () {
    this.cleanField()
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 15px;
}
</style>
