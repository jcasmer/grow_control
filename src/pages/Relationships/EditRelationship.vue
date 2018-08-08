<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Editar parentesco</h4>
      </div>
      <div class="container">
        <div class="row xl-gutter" id="form-diagnostic">
          <div class="col-lg-4 col-xs-12 padding">
            <q-input float-label="Parentesco" v-model="fields.name" placeholder="Ingrese el parentesco" maxlength="150"/>
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
        </div>
        <br>
        <div class="row xl-gutter form-group" >
          <div class="text-left padding">
            <q-btn color="secondary" v-go-back=" '/relationship' " label="Atrás" >
            </q-btn>
          </div>
          <q-btn loader @click="updateDiagnostic" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'EditRelationship',
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
      ]
    }
  },
  methods: {
    setValue: function (value) {
      for (var form in this.fields) {
        this.$set(this.fields, form, value[form])
      }
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
    updateDiagnostic (event, done) {
      let self = this
      this.$axios.put('/relationship/' + this.$route.params.id + '/', this.fields).then(response => {
        self.$root.alertNotify('positive', 'Se actualizó el parentesco correctamente', 'green', '', 'top', 2000)
        self.$router.go(-1)
      }).catch(error => {
        for (var i in this.error) {
          this.errors[i] = ''
        }
        this.errors = error.response.data
      })
    }
  },
  created: function () {
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
    this.getData('/relationship/')
  }
}
</script>

<style scoped>
.title{
  background-image: url(~assets/42.png);
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
