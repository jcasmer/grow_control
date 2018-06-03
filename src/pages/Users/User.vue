<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Administrador de usuarios</h4>
      </div>
      <div class="row xl-gutter" id="form-user">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Usuario" v-model="fields.username" placeholder="Ingrese el usuario" max-length="150"/>
          <div class="lbl-error" v-if="errors.username != 0 && errors.username != null">
              {{ errors.username[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Nombre" v-model="fields.first_name" placeholder="Ingrese nombre" max-length="30"/>
          <div class="lbl-error" v-if="errors.first_name != 0 && errors.first_name != null">
              {{ errors.first_name[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Apellidos" v-model="fields.last_name" placeholder="Ingrese apellidos" max-length="30"/>
          <div class="lbl-error" v-if="errors.last_name != 0 && errors.last_name != null">
              {{ errors.last_name[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Correo Electrónico" v-model="fields.email" placeholder="Correo Electrónico" max-length="30"/>
          <div class="lbl-error" v-if="errors.email != 0 && errors.email != null">
              {{ errors.email[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-select v-model="fields.is_active" :options="selectStatusOptions" separator float-label="Estado"/>
          <div class="lbl-error" v-if="errors.is_active != 0 && errors.is_active != null">
              {{ errors.is_active[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input type="password" float-label="Contraseña" v-model="fields.password" placeholder="Contraseña" max-length="350"/>
          <div class="lbl-error" v-if="errors.password != 0 && errors.password != null">
              {{ errors.password[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input type="password" float-label="Confirme Contraseña" v-model="fields.confirm_password" placeholder="Conrfime Contraseña" max-length="350"/>
          <div class="lbl-error" v-if="errors.confirm_password != 0 && errors.confirm_password != null">
              {{ errors.confirm_password[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-select v-model="fields.groups" :options="selectGroupsOptions" separator float-label="Perfil"/>
          <div class="lbl-error" v-if="errors.groups != 0 && errors.groups != null">
              {{ errors.groups[0] }}
          </div>
        </div>
      </div>
      <br>
      <div class="text-left padding">
        <q-btn loader @click="registerUser" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
      </div>
      <br><br>
      <grid-table ref="table" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:urlParent="urlTable"
        v-bind:editUrl="editUrlTable" v-bind:visibleColumns="visibleColumns" v-bind:filterFields="filterFields"
        v-bind:urlDelete="urlDelete"
      >
      </grid-table>
      <div class="bottom"></div>
    </div>
  </q-page>
</template>

<script>
import GridTable from 'components/Grid/table.vue'
export default {
  name: 'Users',
  components: {
    GridTable
  },
  data () {
    return {
      fields: {
        username: null,
        first_name: null,
        last_name: null,
        is_active: null,
        email: null,
        password: null,
        confirm_password: null,
        groups: null
      },
      errors: {
        username: [],
        first_name: [],
        last_name: [],
        is_active: [],
        email: [],
        password: [],
        confirm_password: [],
        groups: []
      },
      selectStatusOptions: [
        {
          label: 'Activo',
          value: true
        },
        {
          label: 'Inactivo',
          value: false
        }
      ],
      selectGroupsOptions: [],
      columns: [
        { name: 'id', label: '#', field: 'id', sortable: true },
        { name: 'username', label: 'Usuario', field: 'username', sortable: true },
        { name: 'first_name', label: 'Nombre', field: 'first_name', sortable: true },
        { name: 'last_name', label: 'Apellidos', field: 'last_name', sortable: true },
        { name: 'email', label: 'Correo Electrónico', field: 'email', sortable: true },
        { name: 'is_active', label: 'Estado', field: 'is_active_display', sortable: true },
        { name: 'groups', label: 'Perfil', field: 'group_name', sortable: true },
        { name: 'created_at', label: 'Fecha Creación', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['username', 'first_name', 'last_name', 'email', 'is_active', 'groups', 'created_at', 'created_by', 'updated_at', 'updated_by'],
      filterFields: {
        'name__icontains': '',
        'created_by__username__icontains': '',
        'created_at': '',
        'updated_at': '',
        'updated_by__username__icontains': ''
      },
      nameTable: 'Usuarios Aplicación',
      urlTable: '/user-full-data/',
      urlDelete: '/user/',
      editUrlTable: 'user/'
    }
  },
  methods: {
    clearValues: function () {
      for (var i in this.fields) {
        this.fields[i] = null
        this.errors = []
      }
    },
    getGroups () {
      let parameters = {
        nopaginate: 'nopaginate'
      }
      this.$axios.get('/group-full-data/', {
        params: parameters
      }).then(response => {
        let values = response.data.results
        this.selectGroupsOptions.push({value: null, label: ''})
        for (var data in values) {
          this.selectGroupsOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    },
    registerUser (event, done) {
      let self = this
      this.$axios.post('/user/', self.fields).then(response => {
        self.clearValues()
        this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
        this.$root.alertNotify('positive', 'Se ha registrado el usuario exitosamente', 'green', '', 'top')
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
    this.getGroups()
  }
}
</script>

<style>
</style>
