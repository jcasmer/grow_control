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
          <q-select v-model="fields.groups" :options="selectGroupsOptions" separator float-label="Perfil"/>
          <div class="lbl-error" v-if="errors.groups != 0 && errors.groups != null">
              {{ errors.groups[0] }}
          </div>
        </div>
      </div>
      <br>
      <div class="text-left padding">
        <q-btn color="secondary" v-go-back=" '/user' " label="Atrás" >
        </q-btn>
        <q-btn loader @click="updateUser" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
      </div>
      <br><br>
      <div class="bottom"></div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'EditUsers',
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
      changePassword: false
    }
  },
  methods: {
    setValue: function (value) {
      for (var form in this.fields) {
        console.log(form, value[form])
        if (form === 'groups') {
          this.$set(this.fields, form, value[form][0])
        } else if (form === 'password' || form === 'confirm_password') {
          this.$set(this.fields, form, null)
        } else {
          this.$set(this.fields, form, value[form])
        }
      }
    },
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
    getData: function (url) {
      url = url + this.$route.params.id + '/'
      this.$axios.get(url
      ).then(response => {
        this.setValue(response.data)
      }
      ).catch(error => {
        error = null
      })
    },
    updateUser (event, done) {
      let self = this
      this.$axios.put('/user/' + this.$route.params.id + '/', this.fields).then(response => {
        self.$root.alertNotify('positive', 'Se actualizó el usuario correctamente', 'green', '', 'top', 2000)
        self.$router.go(-1)
      }).catch(error => {
        for (var i in this.error) {
          this.errors[i] = ''
        }
        this.errors = error.response.data
      })
    }
  },
  created () {
    this.getGroups()
    this.getData('/user-full-data/')
  }
}
</script>

<style>
</style>
