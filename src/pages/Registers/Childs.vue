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
        <q-btn square color="primary">Guardar todo  <span slot="loading">Procesando...</span></q-btn>
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
  }
}
</script>

<style>
</style>
