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
          Registro familiar
        </q-card-title>
        <q-card-separator color="black"/>
        <q-card-main>
          <div class="row xl-gutter">
            <div class="col-lg-4 col-xs-6 padding">
              <q-input float-label="Documento familiar" v-model="parentsfields.document" placeholder="Ingrese el documento" maxlength="20"/>
              <div class="lbl-error" v-if="errorsParents.document != 0 && errorsParents.document != null">
                  {{ errorsParents.document[0] }}
              </div>
            </div>
            <div class="col-lg-4 col-xs-12 padding">
              <q-select v-model="parentsfields.relationship" :options="selectRelationshipOptions" separator float-label="Parentesco"/>
              <div class="lbl-error" v-if="errorsParents.relationship != 0 && errorsParents.relationship != null">
                  {{ errorsParents.relationship[0] }}
              </div>
            </div>
            <div class="padding text-left">
              <q-btn loader @click="addParent" color="secondary">Añadir familiar<span slot="loading">Procesando...</span></q-btn>
            </div>
            <br><br><br>
            <div class="col-12 padding">
              <q-table ref="tableParents"
                title="Familiar"
                :data="serverData"
                :columns="columns"
                row-key= "document"
                :loading="loading"
                :selection="selection"
                :selected.sync="selected"
                color="primary"
                separator = "horizontal"
              >
                <template slot="top-selection" slot-scope="props">
                  <div class="col" />
                  <q-tooltip>Eliminar registro(s) seleccionado(s)</q-tooltip>
                  <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" tooltip="Eliminar registro(s) seleccionado" />
                </template>
              </q-table>
            </div>
          </div>
        </q-card-main>
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
export default {
  name: 'Childs',
  components: {
    ChildsComponent
  },
  data () {
    return {
      parentsfields: {
        document: null,
        relationship: null
      },
      errorsParents: {
        document: null,
        relationship: null
      },
      selectRelationshipOptions: [],
      columns: [
        { name: 'document', label: 'Documento', field: 'document', sortable: true },
        { name: 'relationship', label: 'Parentesco', field: 'relationship', sortable: true }
      ],
      serverData: []
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
    validateGuests () {
      let contGuest = 0
      for (var i in this.serverData) {
        if (this.serverData[i].document === this.guestsFields.document) {
          this.$root.alertNotify('negative', 'El documento:' + this.guestsFields.document + ' ya se ingresó', 'red', 'thumb_down', 'top', 3000)
          return false
        }
        if (this.serverData[i].relationship === 'Otro (a)' && this.guestsFields.relationship === 'Otro (a)') {
          this.$root.alertNotify('negative', 'No es posible agregar más de un acompañante con parentesco: Otro (a)', 'red', 'thumb_down', 'top', 3000)
          return false
        }
        if (this.serverData[i].relationship === 'Hijo / Hijastro (a)') {
          contGuest += 1
        }
      }
      if (contGuest === 7 && this.guestsFields.relationship === 'Hijo / Hijastro (a)') {
        this.$root.alertNotify('negative', 'Sólo se permite 7 acompañantes con parentesco:: Hijo / Hijastro (a) ', 'red', 'thumb_down', 'top', 3000)
        return false
      }
      return true
    },
    addParents (event, done) {
      if (!this.validateParents()) {
        return
      }
      this.$axios.post('/validate-guests/', this.guestsFields).then(response => {
        this.loading = true
        this.serverData.push(response.data)
        this.clearFormValues()
        this.loading = false
        done()
      }).catch(error => {
        for (var i in this.guestsFields) {
          this.errorsGuests[i] = null
        }
        this.errorsGuests = error.response.data
        done()
      })
      this.loading = false
    }
  },
  created () {
    this.getRelationship()
  }
}
</script>

<style>
</style>
