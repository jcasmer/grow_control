<template>
  <div>
    <div class="row xl-gutter" id="form-advice">
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.document_type" :options="selectDocumentTypeOptions" separator float-label="Tipo documento"/>
        <div class="lbl-error" v-if="errors.type_diagnostic != 0 && errors.type_diagnostic != null">
            {{ errors.type_diagnostic[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Documento" v-model="parentsfields.document" placeholder="Ingrese el documento" maxlength="150"/>
        <div class="lbl-error" v-if="errors.document != 0 && errors.document != null">
            {{ errors.document[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.is_active" :options="selectStatusOptions" separator float-label="Estado"/>
        <div class="lbl-error" v-if="errors.is_active != 0 && errors.is_active != null">
            {{ errors.is_active[0] }}
        </div>
      </div>
    </div>
    <br>
    <div class="text-center padding">
      <q-btn loader @click="registerAdvice" color="primary">Guardar<span slot="loading">Procesando...</span></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParentsComponent',
  props: {
    parentsfields: Object,
    errors: Object,
    selectDocumentTypeOptions: Array,
    selectStatusOptions: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
