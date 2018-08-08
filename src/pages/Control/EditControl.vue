<template>
  <q-page padding>
    <div class="title">
      <h4>Editar Control Menor</h4>
    </div>
    <div class="container">
      <div class="row xl-gutter">
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Altura (cm)" v-model="controlFields.height" placeholder="Ingrese la altura (cm)" maxlength="10"/>
          <div class="lbl-error" v-if="errorsControlFields.height != 0 && errorsControlFields.height != null">
              {{ errorsControlFields.height[0] }}
          </div>
        </div>
        <div class="col-lg-4 col-xs-12 padding">
          <q-input float-label="Peso (kg)" v-model="controlFields.weight" placeholder="Ingrese el peso (kg)" maxlength="10"/>
          <div class="lbl-error" v-if="errorsControlFields.weight != 0 && errorsControlFields.weight != null">
              {{ errorsControlFields.weight[0] }}
          </div>
        </div>
      </div>
      <br>
      <div class="row xl-gutter form-group" >
        <div class="padding text-left">
          <q-btn color="secondary" v-go-back="goBack" label="Atrás" >
          </q-btn>
        </div>
        <q-btn color="primary" @click="updateControl">Actualizar Control<span slot="loading">Procesando...</span></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'EditControl',
  data () {
    return {
      controlFields: {
        child: null,
        height: null,
        weight: null
      },
      errorsControlFields: {
        height: null,
        weight: null
      },
      goBack: ''
    }
  },
  methods: {
    setValue: function (value) {
      for (var form in this.controlFields) {
        this.$set(this.controlFields, form, value[form])
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
    updateControl (event, done) {
      this.$axios.put('/childs-detail/' + this.$route.params.id + '/', this.controlFields).then(response => {
        this.$root.alertNotify('positive', 'Se actualizó el control correctamente', 'green', '', 'top', 2000)
        this.$router.push({path: this.goBack})
      }).catch(error => {
        for (var i in this.errorsControlFields) {
          this.errorsControlFields[i] = ''
        }
        this.errorsControlFields = error.response.data
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
    if (group !== 'administrador' && group !== 'registro información') {
      this.$router.push({path: '/controlchilds'})
      // this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
    }
    this.getData('/childs-detail/')
    this.goBack = '/controlchilds/' + LocalStorage.get.item('document')
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
  /* height: 250px; */
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
