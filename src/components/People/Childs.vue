<template>
  <div>
    <div class="row xl-gutter" id="form-advice">
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Documento" v-model="childsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
        <div class="lbl-error" v-if="errorsChildsFields.document != 0 && errorsChildsFields.document != null">
            {{ errorsChildsFields.document[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input float-label="Nombre" v-model="childsfields.name" placeholder="Ingrese el nombre" maxlength="150"/>
        <div class="lbl-error" v-if="errorsChildsFields.name != 0 && errorsChildsFields.name != null">
            {{ errorsChildsFields.name[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="childsfields.gender" :options="selectGenderOptions" separator float-label="Género"/>
        <div class="lbl-error" v-if="errorsChildsFields.gender != 0 && errorsChildsFields.gender != null">
            {{ errorsChildsFields.gender[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-datetime
          type="date" float-label="Fecha Nacimiento"
          v-model="childsfields.date_born" :max="max" placeholder="Ingrese fecha nacimiento"
          :format24h="false"
        />
        <div class="lbl-error" v-if="errorsChildsFields.date_born != 0 && errorsChildsFields.date_born != null">
            {{ errorsChildsFields.date_born[0] }}
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
const today = new Date()
export default {
  name: 'ChildsComponent',
  data () {
    return {
      max: today,
      childsfields: {
        document: null,
        name: null,
        gender: null,
        date_born: null
      },
      errorsChildsFields: {
        document: null,
        name: null,
        gender: null,
        date_born: null
      },
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
      selectRelationshipOptions: []
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
    },
    clearValues: function () {
      for (var i in this.childsfields) {
        this.childsfields[i] = null
      }
    },
    clearErrorValues: function () {
      for (var j in this.childsfields) {
        this.errorsChildsFields[j] = null
      }
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style>
</style>
