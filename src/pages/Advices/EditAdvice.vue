<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Editar recomendación</h4>
      </div>
      <div class="row xl-gutter" id="form-diagnostic">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Recomendación" v-model="fields.description" placeholder="Ingrese la recomendación" maxlength="150"/>
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
  </q-page>
</template>

<script>
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
    this.getTypeDiagnostic()
    this.getData('/advices/')
  }
}
</script>

<style scoped>
.title{
  background-position: right center;
  background-size: auto 150%;
  background-repeat: no-repeat;
  position: relative;
  top:-55px;
  padding: 5% 10px;
}
</style>
