<template>
  <q-page padding>
    <div class="container">
      <q-card >
        <q-card-title>
          Registro menor
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <childs-component ref="childsComponent">
          </childs-component>
        </q-card-main>
        <q-card-separator />
        <q-card-title>
          Asociar familiar
        </q-card-title>
        <q-card-separator color="black"/>
        <q-card-main>
        </q-card-main>
        <childs-parents-component ref="childsParentsComponent">
        </childs-parents-component>
        <q-card-separator />
        <q-card-actions>
          <q-btn square color="primary">Guardar todo  <span slot="loading">Procesando...</span></q-btn>
        </q-card-actions>
      </q-card>
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
