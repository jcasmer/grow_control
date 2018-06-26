<template>
  <div>
    <div class="row xl-gutter" id="form-child">
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="Identificación o Registro de identidad" v-model="childsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
        <div class="lbl-error" v-if="errorsChildsFields.document != 0 && errorsChildsFields.document != null">
            {{ errorsChildsFields.document[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="Nombre" v-model="childsfields.name" placeholder="Ingrese el nombre" maxlength="150"/>
        <div class="lbl-error" v-if="errorsChildsFields.name != 0 && errorsChildsFields.name != null">
            {{ errorsChildsFields.name[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-select readonly v-model="childsfields.gender" :options="selectGenderOptions" separator float-label="Género"/>
        <div class="lbl-error" v-if="errorsChildsFields.gender != 0 && errorsChildsFields.gender != null">
            {{ errorsChildsFields.gender[0] }}
        </div>
      </div>
      <br><br><br>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input
          type="date" float-label="Fecha Nacimiento" readonly
          v-model="childsfields.date_born" placeholder="Ingrese fecha nacimiento"
        />
        <div class="lbl-error" v-if="errorsChildsFields.date_born != 0 && errorsChildsFields.date_born != null">
            {{ errorsChildsFields.date_born[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding" v-show="age !== null">
        <q-input readonly float-label="Edad (años)" v-model="age" placeholder="Edad"/>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="Altura al nacer (cm)" v-model="childsfields.height_born" placeholder="Ingrese la altura al nacer (cm)" maxlength="5"/>
        <div class="lbl-error" v-if="errorsChildsFields.height_born != 0 && errorsChildsFields.height_born != null">
            {{ errorsChildsFields.height_born[0] }}
        </div>
      </div>
      <br><br><br>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="Peso al nacer (kg)" v-model="childsfields.weight_born" placeholder="Ingrese el peso al nacer (kg)" maxlength="5"/>
        <div class="lbl-error" v-if="errorsChildsFields.weight_born != 0 && errorsChildsFields.weight_born != null">
            {{ errorsChildsFields.weight_born[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="¿Con quién vive el menor?" v-model="childsfields.child_live" placeholder="Ingrese con quién vive el menor" maxlength="150"/>
        <div class="lbl-error" v-if="errorsChildsFields.child_live != 0 && errorsChildsFields.child_live != null">
            {{ errorsChildsFields.child_live[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-xs-12 padding">
        <q-input readonly float-label="Edad en que se abandona la lactancia materna" v-model="childsfields.age_breastfeeding" placeholder="Ingrese edad en que se abandona la lactancia materna" maxlength="20"/>
        <div class="lbl-error" v-if="errorsChildsFields.age_breastfeeding != 0 && errorsChildsFields.age_breastfeeding != null">
            {{ errorsChildsFields.age_breastfeeding[0] }}
        </div>
      </div>
      <div class="padding text-left">
        <q-btn icon="fas fa-chart-line" color="deep-orange" label="Ver gráfica">
        </q-btn>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'ReadOnlyChildComponent',
  data () {
    return {
      age: null,
      childsfields: {
        document: null,
        name: null,
        gender: null,
        date_born: null,
        height_born: null,
        weight_born: null,
        child_live: null,
        age_breastfeeding: null
      },
      errorsChildsFields: {
        document: null,
        name: null,
        gender: null,
        date_born: null,
        height_born: null,
        weight_born: null,
        child_live: null,
        age_breastfeeding: null
      },
      selectRelationshipOptions: []
    }
  },
  methods: {
    setValue: function (value) {
      this.errors = []
      this.childsfields = value[0]
    }
  }
}
</script>

<style>
</style>
