<template>
  <q-page padding>
    <div class="container">
      <div class="row xl-gutter" id="form-diagnostic">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Diagnóstico" v-model="fields.name" placeholder="Ingrese el diagnóstico" maxlength="150"/>
          <div class="lbl-error" v-if="errors.name != 0 && errors.name != null">
              {{ errors.name[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-select v-model="fields.is_active" :options="selectStatusOptions" separator float-label="Estado"/>
          <div class="lbl-error" v-if="errors.is_active != 0 && errors.is_active != null">
              {{ errors.is_active[0] }}
          </div>
        </div>
        <div class="text-center">
          <q-btn loader @click="registerDiagnostic" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
        </div>
      </div>
      <br><br>
      <grid-table ref="table" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:urlParent="urlTable"
        v-bind:editUrl="editUrlTable" v-bind:visibleColumns="visibleColumns" v-bind:filterFields="filterFields"
      >
      </grid-table>
    </div>
  </q-page>
</template>

<script>
import GridTable from 'components/Grid/table.vue'
export default {
  name: 'Diagnostic',
  components: {
    GridTable
  },
  data () {
    return {
      fields: {
        name: '',
        is_active: null
      },
      errors: {
        name: '',
        is_active: null
      },
      selectStatusOptions: [
        {
          label: '',
          value: null
        },
        {
          label: 'Activo',
          value: true
        },
        {
          label: 'Inactivo',
          value: false
        }
      ],
      columns: [
        { name: 'id', label: '#', field: 'id', sortable: true },
        { name: 'name', label: 'Diagnóstico', field: 'name', sortable: true },
        { name: 'is_active', label: 'Estado', field: 'is_active_display', sortable: true },
        { name: 'created_at', label: 'Fecha Creación', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['name', 'is_active', 'created_at', 'created_by', 'updated_at', 'updated_by'],
      filterFields: {
        'name__icontains': '',
        'created_by__username__icontains': '',
        'created_at': '',
        'updated_at': '',
        'updated_by__username__icontains': ''
      },
      nameTable: 'Tipos Diagnósticos',
      urlTable: '/type-diagnostic-full-data/',
      editUrlTable: 'diagnostic/'
    }
  },
  methods: {
    clearValues: function () {
      for (var i in this.fields) {
        this.fields[i] = null
        this.errors = []
      }
    },
    registerDiagnostic (event, done) {
      let self = this
      this.$axios.post('/type-diagnostic/', self.fields).then(response => {
        self.clearValues()
        this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
        this.$root.alertNotify('positive', 'Se ha registrado el diagnóstico exitosamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          for (var i in this.fields) {
            this.errors[i] = ''
          }
          this.errors = error.response.data
          this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
