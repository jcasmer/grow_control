<template>
  <q-page padding>
    <div class="container">
      <div class="title">
        <h4>Control del menor</h4>
      </div>
      <div class="container">
        <div class="row xl-gutter">
          <div class="col-lg-4 col-xs-6 padding">
            <q-input float-label="Documento del menor" v-model="document" placeholder="Ingrese el documento del menor" maxlength="20"/>
            <div class="lbl-error" v-if="errors.document != 0 && errors.document != null">
                {{ errors.document[0] }}
            </div>
          </div>
          <q-btn round color="secondary" size="md" @click="searchChild">
            <q-icon name="fas fa-search" />
            <q-tooltip>Buscar</q-tooltip>
          </q-btn>
        </div>
        <div class="bottom"></div>
        <div v-show="controlFields.child != null">
          <q-alert color="tertiary">
            Información del menor
          </q-alert>
          <div class="bottom"></div>
          <read-only-child-component ref="readonlyChildComponent" v-bind:age="age">
          </read-only-child-component>
          <div v-show="!showGraph" class="padding text-left">
            <q-btn icon="fas fa-chart-line" color="deep-orange" label="Ver gráfica" @click="drawGraph">
            </q-btn>
          </div>
          <div v-show="!showGraph">
            <br>
            <q-alert color="tertiary">
              Registrar control
            </q-alert>
            <br>
            <div class="row xl-gutter">
              <div class="col-lg-4 col-xs-12 padding">
                <q-input float-label="Altura (cm)" v-model="controlFields.height" placeholder="Ingrese la altura (cm)" maxlength="10"/>
                <div class="lbl-error" v-if="errorsControlFields.height != 0 && errorsControlFields.height != null">
                    {{ errorsControlFields.height[0] }}
                </div>
              </div>
              <div class="col-lg-4 col-xs-12 padding">
                <q-input float-label="Peso (kg)" v-model="controlFields.weight" placeholder="Ingrese el peso (kg)" maxlength="10"/>
                <div class="lbl-error" v-if="errorsControlFields.weight != 0 && errorsControlFields.weight != null">
                    {{ errorsControlFields.weight[0] }}
                </div>
              </div>
              <div class="padding text-left">
                <q-btn color="primary" @click="registerControl">Guardar Control<span slot="loading">Procesando...</span></q-btn>
              </div>
            </div>
            <br>
            <grid-table ref="table" v-bind:columns="columns" v-bind:nameTable="nameTable" v-bind:urlParent="urlTable"
              v-bind:editUrl="editUrlTable" v-bind:visibleColumns="visibleColumns" v-bind:filterFields="filterFields"
              v-bind:urlDelete="urlDelete"
            >
            </grid-table>
          </div>
        </div>
        <div v-if="showGraph">
          <div class="padding text-left">
            <q-btn color="secondary" label="Ir a registrar control" @click="addControl" v-show="showRegisterControl">
            </q-btn>
          </div>
          <br>
          <q-alert color="tertiary" v-show="controlFields.child != null">
              Gráficas
          </q-alert>
          <child-chart-component ref="chartChild" v-bind:idChild="this.controlFields.child" v-show="controlFields.child != null">
          </child-chart-component>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import ReadOnlyChildComponent from 'components/People/ReadOnlyChilds.vue'
import GridTable from 'components/Grid/table.vue'
import ChildChartComponent from 'components/Chart/Child.vue'
export default {
  name: 'ControlChild',
  components: {
    ReadOnlyChildComponent,
    ChildChartComponent,
    GridTable
  },
  data () {
    return {
      showRegisterControl: true,
      document: null,
      age: null,
      errors: {
        document: null
      },
      controlFields: {
        child: null,
        height: null,
        weight: null
      },
      errorsControlFields: {
        height: null,
        weight: null
      },
      showGraph: false,
      columns: [
        { name: 'id', label: '#', field: 'id', sortable: true },
        { name: 'weight', label: 'Peso', field: 'weight', sortable: true },
        { name: 'height', label: 'Altura', field: 'height', sortable: true },
        { name: 'created_at', label: 'Fecha del control', field: 'created_at', sortable: true },
        { name: 'created_by', label: 'Creado Por', field: 'created_by', sortable: true },
        { name: 'updated_at', label: 'Fecha Modificación', field: 'updated_at', sortable: true },
        { name: 'updated_by', label: 'Modificado Por', field: 'updated_by', sortable: true }
      ],
      visibleColumns: ['weight', 'height', 'created_at', 'created_by', 'updated_at', 'updated_by'],
      filterFields: {
        'name__icontains': '',
        'created_by__username__icontains': '',
        'created_at': '',
        'updated_at': '',
        'updated_by__username__icontains': ''
      },
      nameTable: 'Controles Realizados',
      urlTable: '',
      urlDelete: '/childs-detail/',
      editUrlTable: ''
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
        this.$refs['readonlyChildComponent'].selectRelationshipOptions.push({value: null, label: ''})
        for (var data in values) {
          this.$refs['readonlyChildComponent'].selectRelationshipOptions.push({value: values[data].id, label: values[data].name})
        }
      }
      ).catch(error => {
        error = null
      })
    },
    searchChild () {
      for (var i in this.$refs['readonlyChildComponent'].childsfields) {
        this.$refs['readonlyChildComponent'].errorsChildsFields[i] = ''
      }
      if (this.document === null || this.document === '') {
        this.errors.document = ['Este campo no puede ser nulo.']
        this.controlFields.child = null
        LocalStorage.remove('document')
        return
      }
      let parameters = {
        document: this.document,
        nopaginate: 'nopaginate',
        is_active: 1
      }
      this.$axios.get('/childs/', {
        params: parameters
      }).then(response => {
        this.errors.document = null
        if (response.data.length > 0) {
          this.$refs['readonlyChildComponent'].setValue(response.data)
          this.age = response.data[0].age
          this.controlFields.child = response.data[0].id
          LocalStorage.set('document', this.document)
          this.urlTable = '/childs-detail-full-data/?child=' + response.data[0].id
          let filters = {
            child: this.controlFields.child
          }
          this.$refs.table.url = this.urlTable
          this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: filters })
        } else {
          this.errors.document = null
          this.document = null
          this.controlFieldsidChild.child = null
          this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
        }
        this.showGraph = false
      }).catch(error => {
        this.errors.document = null
        this.document = null
        this.controlFields.child = null
        error = null
        this.$root.alertNotify('negative', 'No se encontró registro para el documento ingresado', 'red', '', 'top', 3000)
      })
    },
    registerControl () {
      this.$axios.post('/childs-detail/', this.controlFields).then(response => {
        this.controlFields.height = null
        this.controlFields.weight = null
        this.errorsControlFields.weight = null
        this.errorsControlFields.height = null
        this.$refs.table.request({ pagination: this.$refs.table.serverPagination, filter: this.$refs.table.filter })
        this.$root.alertNotify('positive', 'Control ingresado correctamente', 'green', '', 'top')
      }).catch(error => {
        if (error.response !== undefined) {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 6000)
          }
          this.errorsControlFields = error.response.data
        }
      })
    },
    drawGraph () {
      this.showGraph = true
      this.errorsControlFields = []
    },
    addControl () {
      this.showGraph = false
    }
  },
  created () {
    let group = LocalStorage.get.item('groups')
    if (typeof group === 'undefined' || group === null) {
      this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      this.$router.push({path: '/login'})
    } else {
      group = String(LocalStorage.get.item('groups')).toLowerCase()
    }
    if (group !== 'administrador' && group !== 'registro información' && group !== 'consulta') {
      this.$root.alert('negative', 'Debe iniciar sesión', 'red', 'thumb_down', 'top')
      this.$router.push({path: '/login'})
    } else if (group === 'consulta') {
      this.showGraph = true
      this.showRegisterControl = false
    }
    this.getRelationship()
    this.editUrlTable = 'editcontrol/'
  },
  mounted () {
    if (this.$route.params.document !== null && typeof this.$route.params.document !== 'undefined') {
      this.document = this.$route.params.document
      this.searchChild()
    } else {
      this.document = null
    }
  }
}
</script>

<style scoped>
.title{
  background-image: url(~assets/childs.png);
  background-position: right center;
  background-size: auto 150%;
  background-repeat: no-repeat;
  position: relative;
  top:-45px;
  height: 150px;
  padding: 5% 40px;
}
h4, h2, h5, h6{
  line-height: 0;
}
h4{
  color: #1f4399;
  font-weight: 600;
}
h2{
  color: #ff5722;
  font-weight: 600;
}
.container{
  width: 95%;
  margin: auto;
}
@media (max-width: 800px){
  .title{
  background-position: right bottom;
  background-size: auto 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 0px;
  height: 150px;
  padding: 5% 50px;
}
}
</style>
