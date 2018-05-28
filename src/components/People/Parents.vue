<template>
  <div>
    <div class="row xl-gutter" id="form-advice">
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.document_type" :options="selectDocumentTypeOptions" separator float-label="Tipo documento"/>
        <div class="lbl-error" v-if="errors.document_type != 0 && errors.document_type != null">
            {{ errors.document_type[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Documento" v-model="parentsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
        <div class="lbl-error" v-if="errors.document != 0 && errors.document != null">
            {{ errors.document[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Nombre" v-model="parentsfields.name" placeholder="Ingrese el nombre" maxlength="150"/>
        <div class="lbl-error" v-if="errors.name != 0 && errors.name != null">
            {{ errors.name[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input type="number" float-label="Edad" v-model="parentsfields.age" placeholder="Ingrese la edad" maxlength="3"/>
        <div class="lbl-error" v-if="errors.age != 0 && errors.age != null">
            {{ errors.age[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.gender" :options="selectGenderOptions" separator float-label="Género"/>
        <div class="lbl-error" v-if="errors.gender != 0 && errors.gender != null">
            {{ errors.gender[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.relationship" :options="selectRelationshipOptions" separator float-label="Parentesco"/>
        <div class="lbl-error" v-if="errors.relationship != 0 && errors.relationship != null">
            {{ errors.relationship[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Correo electrónico" v-model="parentsfields.email" placeholder="Ingrese el correo"/>
        <div class="lbl-error" v-if="errors.email != 0 && errors.email != null">
            {{ errors.email[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Teléfono" v-model="parentsfields.phone_number" placeholder="Ingrese el teléfono"/>
        <div class="lbl-error" v-if="errors.phone_number != 0 && errors.phone_number != null">
            {{ errors.phone_number[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="parentsfields.social_stratum" :options="selectSolcialStratumOptions" separator float-label="Estrato social"/>
        <div class="lbl-error" v-if="errors.social_stratum != 0 && errors.social_stratum != null">
            {{ errors.social_stratum[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input type=number float-label="Altura (cm)" :decimals="2" v-model="parentsfields.height" placeholder="Ingrese el altura (cm)" maxlength="4"/>
        <div class="lbl-error" v-if="errors.height != 0 && errors.height != null">
            {{ errors.height[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input type=number float-label="Peso (kg)" :decimals="2" v-model="parentsfields.weight" placeholder="Ingrese el peso (kg)" maxlength="4"/>
        <div class="lbl-error" v-if="errors.weight != 0 && errors.weight != null">
            {{ errors.weight[0] }}
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'ParentsComponent',
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
      ],
      selectGenderOptions: [
        {
          label: '',
          value: null
        },
        {
          label: 'Masculino',
          value: 'Masculino'
        },
        {
          label: 'Femenino',
          value: 'Femenino'
        }

      ],
      selectRelationshipOptions: [],
      selectSolcialStratumOptions: [
        {
          label: '',
          value: null
        },
        {
          label: 'Estrato 0',
          value: '0'
        },
        {
          label: 'Estrato 1',
          value: '1'
        },
        {
          label: 'Estrato 2',
          value: '2'
        },
        {
          label: 'Estrato 3',
          value: '3'
        },
        {
          label: 'Estrato 4',
          value: '4'
        },
        {
          label: 'Estrato 5',
          value: '5'
        }
        // {
        //   label: 'Otro',
        //   value: '6'
        // }
      ]
    }
  },
  methods: {
    getRelationship () {
      let parameters = {
        nopaginate: 'nopaginate',
        is_active: 'True',
        ordering: 'name'
      }
      this.$axios.get('/relationship/', {
        params: parameters
      }).then(response => {
        let values = response.data
        this.selectRelationshipOptions.push({value: null, label: ''})
        for (var data in values) {
          this.selectRelationshipOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>
<style>
</style>
