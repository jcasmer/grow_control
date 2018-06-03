<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Editar diagnóstico</h4>
      </div>
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
      </div>
      <br>
      <div class="row xl-gutter form-group" >
        <div class="padding text-left">
          <q-btn color="secondary" v-go-back=" '/diagnostic' " label="Atrás" >
          </q-btn>
        </div>
        <q-btn loader @click="updateDiagnostic" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'EditDiagnostic',
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
      this.$axios.put('/type-diagnostic/' + this.$route.params.id + '/', this.fields).then(response => {
        self.$root.alertNotify('positive', 'Se actualizó el diagnostico correctamente', 'green', '', 'top', 2000)
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
    this.getData('/type-diagnostic/')
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
