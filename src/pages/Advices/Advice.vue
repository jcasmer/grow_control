<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Administrador de</h4>
        <h2>recomendaciones</h2>
      </div>
      <div class="container">
        <div class="row xl-gutter" id="form-advice">
          <div class="col-lg-4 col-xs-12 padding">
            <q-input float-label="Recomendación" v-model="fields.description" placeholder="Ingrese la recomendación" maxlength="500"/>
            <div class="lbl-error" v-if="errors.description != 0 && errors.description != null">
                {{ errors.description[0] }}
            </div>
          </div>
          <div class="col-lg-4 col-xs-12 padding">
            <q-select v-model="fields.type_diagnostic" :options="selectTypeDiagnosticOptions" separator float-label="Diagnóstico"/>
            <div class="lbl-error" v-if="errors.type_diagnostic != 0 && errors.type_diagnostic != null">
                {{ errors.type_diagnostic[0] }}
            </div>
          </div>
          <div class="col-lg-4 col-xs-12 padding">
            <q-select v-model="fields.is_active" :options="selectStatusOptions" separator float-label="Estado"/>
            <div class="lbl-error" v-if="errors.is_active != 0 && errors.is_active != null">
                {{ errors.is_active[0] }}
            </div>
          </div>
        </div>
        <br>
        <div class="padding text-left">
          <q-btn loader @click="registerAdvice" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
        </div>
        <br><br>
        <grid-table ref="table" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:urlParent="urlTable"
          v-bind:editUrl="editUrlTable" v-bind:visibleColumns="visibleColumns" v-bind:filterFields="filterFields"
          v-bind:urlDelete="urlDelete"
        >
        </grid-table>
      </div>
    </div>
    <div class="bottom"></div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import GridTable from 'components/Grid/table.vue'
export default {
  name: 'Advice',
  components: {
    GridTable
  },
  data () {
    return {
      fields: {
        description: null,
        type_diagnostic: null,
        is_active: null
      },
      errors: {
        description: '',
        type_diagnostic: null,
        is_active: null
      },
      selectTypeDiagnosticOptions: [],
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
        { name: 'type_diagnostic', label: 'Diagnóstico', field: 'type_diagnostic', sortable: true },
        { name: 'description', label: 'Recomendación', field: 'description', sortable: true },
        { name: 'is_active', label: 'Estado', field: 'is_active_display', sortable: true },
        { name: 'created_at', label: 'Fecha Creación', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['description', 'type_diagnostic', 'is_active', 'created_at', 'created_by', 'updated_at', 'updated_by'],
      filterFields: {
        'description__icontains': '',
        'created_by__username__icontains': '',
        'created_at': '',
        'updated_at': '',
        'updated_by__username__icontains': ''
      },
      nameTable: 'Recomendaciones por diagnóstico',
      urlTable: '/advices-full-data/',
      urlDelete: '/advices/',
      editUrlTable: 'advice/'
    }
  },
  methods: {
    clearValues: function () {
      for (var i in this.fields) {
        this.fields[i] = null
        this.errors = []
      }
    },
    getTypeDiagnostic () {
      let parameters = {
        nopaginate: 'nopaginate',
        is_active: 'True',
        ordering: 'name'
      }
      this.$axios.get('/type-diagnostic/', {
        params: parameters
      }).then(response => {
        let values = response.data
        this.selectTypeDiagnosticOptions.push({value: null, label: ''})
        for (var data in values) {
          this.selectTypeDiagnosticOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    },
    registerAdvice (event, done) {
      this.$axios.post('/advices/', this.fields).then(response => {
        this.clearValues()
        this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
        this.$root.alertNotify('positive', 'Se ha registrado la recomendación exitosamente', 'green', '', 'top')
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
  },
  created () {
    let group = LocalStorage.get.item('groups')
    if (typeof group === 'undefined' || group === null) {
      this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      this.$router.push({path: '/login'})
    } else if (String(LocalStorage.get.item('groups')).toLowerCase() !== 'administrador') {
      this.$router.push({path: '/controlchilds'})
      // this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
    }
    this.getTypeDiagnostic()
  }
}
</script>

<style scoped>
.title{
  background-image: url(~assets/childs.png);
  background-position: right center;
  background-size: auto 150%;
  background-repeat: no-repeat;
  position: relative;
  top:-45px;
  height: 200px;
  padding: 5% 50px;
}
h4, h2, h5, h6{
  line-height: 0;
}
h4{
  color: #1f4399;
  font-weight: 600;
}
h2{
  color: #ff5722;
  font-weight: 600;
}
.container{
  width: 95%;
  margin: auto;
}
@media (max-width: 800px){
  .title{
  background-position: right bottom;
  background-size: auto 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 0px;
  height: 150px;
  padding: 5% 50px;
}
}
</style>
