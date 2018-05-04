<template>
<div class="col-12 padding">
  <q-table ref="grwTable"
    :title="nameTable"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="id"
    :loading= loading
    separator = "horizontal"
    @request="request"
    :selection="selection"
    :selected.sync="selected"
    :visible-columns="visibleColumns"
    no-data-label="No se encontraron registros"
  >
    <template slot="top-selection" slot-scope="props">
      <div class="col">
        <span>Registro selecionado</span>
        <q-btn color="positive" flat round  icon="far fa-edit" @click="editRow" tooltip="Editar registro seleccionado">
          <q-tooltip>Editar registro seleccionado</q-tooltip>
        </q-btn>
        <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" tooltip="Eliminar registro seleccionado" >
          <q-tooltip>Eliminar registro seleccionado</q-tooltip>
        </q-btn>
      </div>
    </template>
  </q-table>
</div>
</template>

<script>
export default {
  name: 'GrowTable',
  data () {
    return {
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 0
      },
      selection: 'single',
      selected: [],
      url: '',
      serverData: []
    }
  },
  props: {
    columns: Array,
    visibleColumns: Array,
    filter: String,
    nameTable: null,
    urlParent: String,
    editUrl: String,
    btnDelete: true,
    btnEdit: true
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)
      let urlData = ''
      urlData = this.url + `?page=${pagination.page}`
      // .get(`/data/${pagination.page}?sortBy=${pagination.sortBy}&ordering=${pagination.descending}&filter=${filter}`)
      this.$axios.get(urlData).then(response => {
        // updating pagination to reflect in the UI
        this.serverPagination = pagination
        // we also set (or update) rowsNumber
        // then we update the rows with the fetched ones
        this.serverData = response.data.results
        this.serverPagination.rowsNumber = response.data.num_pages
        this.serverPagination.page = response.data.current_page
        // finally we tell QTable to exit the "loading" state
        this.loading = false
      }).catch(error => {
        // there's an error... do SOMETHING
        // we tell QTable to exit the "loading" state
        if (error.response.data.error) {
          this.$root.alertNotify('negative', String(error.response.data.error), 'red', 'thumb_down', 'top', 3000)
        }
        this.loading = false
        this.selected = []
      })
    },
    editRow () {
      let urlEdit = this.editUrl + this.selected[0].id
      this.$router.push({path: urlEdit})
    },
    deleteRow () {
      let deleteUrl = this.url + this.selected[0].id
      this.$q.dialog({
        title: '¿Eliminar registro?',
        message: 'Está seguro que desea eliminar este registro',
        ok: 'Aceptar',
        cancel: 'Cancelar'
      }).then(() => {
        this.$axios.delete(deleteUrl
        ).then(response => {
          this.request({ pagination: this.serverPagination, filter: this.filter })
          this.selected = []
          this.$root.alertNotify('positive', 'Se ha eliminado el registro exitosamente.', 'green', 'thumb_up', 'top')
        }).catch(error => {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', 'thumb_down', 'top', 3000)
          } else {
            this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', 'thumb_down', 'top')
          }
        })
      }).catch(() => {
      })
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.url = this.urlParent
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>

<style scoped>
</style>
