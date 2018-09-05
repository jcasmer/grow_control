<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Editar</h4>
        <h2>usuario</h2>
      </div>
      <div class="container">
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
          <br><br><br>
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
          <br><br><br>
          <div class="col-lg-4 col-xs-12 padding">
            <q-checkbox v-model="changePassword" label="Cambiar contraseña" />
          </div>
          <div class="col-lg-4 col-xs-12 padding" v-if="changePassword">
            <q-input v-if="changePassword" type="password" float-label="Contraseña" v-model="password" placeholder="Contraseña" max-length="350"/>
            <div class="lbl-error" v-if="errors.password != 0 && errors.password != null && changePassword">
                {{ errors.password[0] }}
            </div>
          </div>
          <div class="col-lg-4 col-xs-12 padding">
            <q-input v-if="changePassword" type="password" float-label="Confirme Contraseña" v-model="confirm_password" placeholder="Conrfime Contraseña" max-length="350"/>
            <div class="lbl-error" v-if="errors.confirm_password != 0 && errors.confirm_password != null && changePassword">
                {{ errors.confirm_password[0] }}
            </div>
          </div>
        </div>
        <br>
        <div class="row xl-gutter form-group" >
          <div class="padding text-left">
            <q-btn color="secondary" v-go-back=" '/user' " label="Atrás" >
            </q-btn>
          </div>
          <q-btn loader @click="updateUser" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
        </div>
        <br><br>
        <div class="bottom"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
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
      changePassword: false,
      password: null,
      confirm_password: null
    }
  },
  methods: {
    setValue: function (value) {
      for (var form in this.fields) {
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
      let updatedFields = {}
      if (this.changePassword) {
        updatedFields = this.fields
        updatedFields['changePassword'] = this.changePassword
        updatedFields['password'] = this.password
        updatedFields['confirm_password'] = this.confirm_password
        // this.fields.push({ key: "password", value: this.password})
        // this.fields.push({ key: "confirm_password", value: })
      } else {
        updatedFields = this.fields
        updatedFields['changePassword'] = this.changePassword
      }
      this.$axios.put('/user/' + this.$route.params.id + '/', updatedFields).then(response => {
        this.$root.alertNotify('positive', 'Se actualizó el usuario correctamente', 'green', '', 'top', 2000)
        this.$router.go(-1)
      }).catch(error => {
        for (var i in this.error) {
          this.errors[i] = ''
        }
        this.errors = error.response.data
      })
    }
  },
  created () {
    let group = LocalStorage.get.item('groups')
    if (typeof group === 'undefined' || group === null) {
      this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      this.$router.push({path: '/login'})
    } else {
      group = String(LocalStorage.get.item('groups')).toLowerCase()
    }
    if (group !== 'administrador') {
      this.$router.push({path: '/controlchilds'})
      // this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
    }
    this.getGroups()
    this.getData('/user-full-data/')
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
  height: 150px;
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
