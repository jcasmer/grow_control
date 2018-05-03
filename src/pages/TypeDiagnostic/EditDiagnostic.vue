<template>
  <q-page padding>
    <div class="title">
      <h4>Editar Diagnóstico</h4>
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
    <div class="text-center">
      <q-btn color="primary" v-go-back=" '/diagnostic' " label="Atrás" >
      </q-btn>
        <q-btn loader @click="updateDiagnostic" color="primary">Actualizar<span slot="loading">Procesando...</span></q-btn>
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
  }
}
</script>

<style scoped>
.title{
  background-position: right center;
  background-size: auto 150%;
  background-repeat: no-repeat;
  position: relative;
  top:-45px;
  padding: 5% 50px;
}
</style>
