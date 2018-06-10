<template>
  <q-page padding>
    <div class="container">
       <q-alert color="tertiary">
        Registro menor
      </q-alert>
      <br>
      <childs-component ref="childsComponent">
      </childs-component>
      <q-alert color="tertiary">
         Asociar familiar
      </q-alert>
      <br>
      <childs-parents-component ref="childsParentsComponent">
      </childs-parents-component>
      <br>
      <div class="text-left padding">
        <q-btn square color="primary" @click="registerChild">Guardar todo  <span slot="loading">Procesando...</span></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import ChildsComponent from 'components/People/Childs.vue'
import ChildsParentsComponent from 'components/People/ChildsParents.vue'
export default {
  name: 'Childs',
  components: {
    ChildsComponent,
    ChildsParentsComponent
  },
  data () {
    return {
    }
  },
  methods: {
    registerChild () {
      if (this.$refs['childsParentsComponent'].serverData.length === 0) {
        this.$root.alertNotify('warning', 'Debe ingresar al menos un familiar', 'red', 'fas fa-info-circle', 'top', 3000)
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
        this.$q.loading.show()
        this.$root.alertNotify('positive', 'Registro ingresado correctamente', 'green', '', 'top')
      }).catch(error => {
        this.$q.loading.hide()
        if (error.response !== undefined) {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 7000)
          }
          for (var i in this.$refs['childsComponent'].childsfields) {
            this.$refs['childsComponent'].childsfields[i] = null
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
