<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Editar</h4>
        <h2>recomendación</h2>
      </div>
      <div class="container">
        <div class="row xl-gutter" id="form-diagnostic">
          <div class="col-lg-12 col-xs-12 padding">
            <q-input type="textarea" float-label="Recomendación" v-model="fields.description" placeholder="Ingrese la recomendación" maxlength="1000"/>
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
        <div class="row xl-gutter form-group" >
          <div class="padding text-left">
            <q-btn color="secondary" v-go-back=" '/advice' " label="Atrás" >
            </q-btn>
          </div>
          <q-btn loader @click="updateAdvice" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'EditAdvice',
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
      ]
    }
  },
  methods: {
    setValue: function (value) {
      for (var form in this.fields) {
        this.$set(this.fields, form, value[form])
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
    updateAdvice (event, done) {
      let self = this
      this.$axios.put('/advices/' + this.$route.params.id + '/', this.fields).then(response => {
        self.$root.alertNotify('positive', 'Se actualizó la recomendación correctamente', 'green', '', 'top', 2000)
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
    } else if (String(LocalStorage.get.item('groups')).toLowerCase() !== 'administrador') {
      this.$router.push({path: '/controlchilds'})
      // this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
    }
    this.getTypeDiagnostic()
    this.getData('/advices/')
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
