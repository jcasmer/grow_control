<template>
  <q-page padding>
    <div class="container">
     <div class="title">
        <h4>Registro Padres</h4>
      </div>
      <parents-component ref="parentsComponent" v-bind:parentsfields="parentsfields"
        v-bind:errors="errors" v-bind:selectDocumentTypeOptions="selectDocumentTypeOptions"
        v-bind:selectStatusOptions="selectStatusOptions"
      >
      </parents-component>
      <div class="bottom"></div>
    </div>
  </q-page>
</template>

<script>
import ParentsComponent from 'components/People/Parents.vue'
export default {
  name: 'Parents',
  components: {
    ParentsComponent
  },
  data () {
    return {
      parentsfields: {
        document_type: null,
        document: null,
        name: null,
        age: null,
        gender: null,
        relationship: null,
        phone_number: null,
        email: null,
        social_stratum: null,
        height: null,
        weight: null,
        is_active: null
      },
      errors: {
        ocument_type: null,
        document: null,
        name: null,
        age: null,
        gender: null,
        relationship: null,
        phone_number: null,
        email: null,
        social_stratum: null,
        height: null,
        weight: null,
        is_active: null
      },
      selectDocumentTypeOptions: [
        {
          label: '',
          value: null
        },
        {
          label: 'Cédula',
          value: 'Cédula'
        },
        {
          label: 'Cédula Extranjería',
          value: 'Cédula Extranjería'
        }
      ],
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

<style>
</style>
