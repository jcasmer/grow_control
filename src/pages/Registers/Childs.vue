<template>
  <q-page padding>
    <div class="container">
      <q-tabs color="secondary" inverted align="justify">
        <q-tab default name="child" slot="title" icon="far fa-id-card" label="Registrar Menor" />
        <q-tab  name="edit-child" slot="title" icon="fas fa-address-card" label="Editar Información del menor" />
        <q-tab-pane name="child">
          <q-alert color="tertiary">
            Registro menor
          </q-alert>
          <br>
          <childs-component ref="childsComponent">
          </childs-component>
          <q-alert color="tertiary">
            Asociar responsable
          </q-alert>
          <br>
          <childs-parents-component ref="childsParentsComponent">
          </childs-parents-component>
          <br>
          <div class="text-left padding">
            <q-btn square color="primary" @click="registerChild">Guardar todo  <span slot="loading">Procesando...</span></q-btn>
          </div>
         </q-tab-pane>
        <q-tab-pane name="edit-child">
          <edit-child-component ref="editChildComponent">
          </edit-child-component>
        </q-tab-pane>
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import ChildsComponent from 'components/People/Childs.vue'
import ChildsParentsComponent from 'components/People/ChildsParents.vue'
import EditChildComponent from 'components/People/EditChild.vue'
export default {
  name: 'Childs',
  components: {
    ChildsComponent,
    ChildsParentsComponent,
    EditChildComponent
  },
  data () {
    return {
    }
  },
  methods: {
    registerChild () {
      let obj = this.$refs['childsComponent'].childsfields
      if (Object.keys(obj).every((k) => obj[k]) && this.$refs['childsParentsComponent'].serverData.length === 0) {
        this.$refs['childsComponent'].clearErrorValues()
        this.$root.alertNotify('negative', 'Debe ingresar al menos un familiar', 'red', 'fas fa-info-circle', 'top', 3000)
        return
      }
      let childArray = {}
      childArray = {
        'child': this.$refs['childsComponent'].childsfields,
        'parents': this.$refs['childsParentsComponent'].serverData
      }
      let registrationForm = []
      registrationForm.push(childArray)
      this.$axios.post('/register-child/', registrationForm).then(response => {
        this.$refs['childsComponent'].clearValues()
        this.$refs['childsComponent'].clearErrorValues()
        this.$refs['childsComponent'].serverData = []
        this.$root.alertNotify('positive', 'Registro ingresado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 6000)
          }
          this.$refs['childsComponent'].errorsChildsFields = error.response.data
        }
      })
    }
  }
}
</script>

<style>
</style>
