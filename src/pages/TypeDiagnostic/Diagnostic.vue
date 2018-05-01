<template>
  <q-page padding>
    <div class="container">
      <div class="row xl-gutter" id="form-diagnostic">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Diagnóstico" v-model="fields.name" placeholder="Ingrese el diagnóstico" max-length="100"/>
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
      <grid-table ref="table" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:url="urlTable">
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
        { name: 'is_active', label: 'Estado', field: 'is_active', sortable: true }
      ],
      nameTable: 'Tipos Diagnósticos',
      urlTable: '/type-diagnostic-full-data/',
      serverPagination: {
        page: 1,
        rowsNumber: 10
      }
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
        this.$root.alertNotify('positive', 'Se ha registrado el diagnóstico exitosamente', 'green', 'thumb_up', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          for (var i in this.fields) {
            this.errors[i] = ''
          }
          this.errors = error.response.data
        }
      })
      this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
    }
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: auto;
}
</style>
