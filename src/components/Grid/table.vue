<template>
<div class="col-12 padding">
  <q-table ref="grwTable"
    :title="nameTable"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="id"
    :loading="loading"
    separator = "horizontal"
    @request="request"
    :selection="selection"
    :selected.sync="selected"
    :visible-columns="visibleColumns"
    no-data-label="No se encontraron registros"
    :pagination.sync="serverPagination"
    color="secondary"
  >
    <template slot="top-selection" slot-scope="props">
      <div class="col">
        <span>Acciones registro selecionado</span>
        <q-btn color="positive" flat round  icon="far fa-edit" @click="editRow" tooltip="Editar registro seleccionado">
          <q-tooltip>Editar registro seleccionado</q-tooltip>
        </q-btn>
        <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" tooltip="Eliminar registro seleccionado" >
          <q-tooltip>Eliminar registro seleccionado</q-tooltip>
        </q-btn>
      </div>
    </template>
    <div slot="bottom" slot-scope="props" class="row flex-center q-py-sm">
      <q-btn
        round dense size="sm" icon="undo" color="primary" class="q-mr-sm"
        :disable="props.isFirstPage"
        @click="props.prevPage"
      />
      <div class="q-mr-sm" style="font-size: small">
        <b>Página {{ props.pagination.page }} de {{ props.pagination.pagesNumber }}</b>
      </div>
      <q-btn
        round dense size="sm" icon="redo" color="primary"
        :disable="props.pagination.page === props.pagination.pagesNumber"
        @click="props.nextPage"
      />
    </div>
  </q-table>
</div>
</template>

<script>
export default {
  name: 'GrowTable',
  data () {
    return {
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        pagesNumber: 0
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
    filterParent: String,
    nameTable: null,
    urlParent: String,
    editUrl: String,
    urlDelete: String,
    btnDelete: true,
    btnEdit: true,
    filterFields: Object
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true
      this.selected = []
      let ordering = `${pagination.descending}` === 'true' && `${pagination.descending}` !== null ? String(`${pagination.sortBy}`) : '-' + String(`${pagination.sortBy}`)
      let parameters = {
        page: `${pagination.page}`,
        ordering: ordering
      }
      this.$axios.get(this.url, {
        params: parameters
      }).then(response => {
        // updating pagination to reflect in the UI
        this.serverPagination = pagination
        // we also set (or update) rowsNumber
        // then we update the rows with the fetched ones
        this.serverData = response.data.results
        this.serverPagination.rowsNumber = response.data.count
        this.serverPagination.page = response.data.current_page
        this.serverPagination.pagesNumber = response.data.num_pages
        // finally we tell QTable to exit the "loading" state
        this.loading = false
      }).catch(error => {
        // there's an error... do SOMETHING
        // we tell QTable to exit the "loading" state
        if (error.response.data.error) {
          this.$root.alertNotify('negative', String(error.response.data.error), 'red', '', 'top', 3000)
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
      let deleteUrl = this.urlDelete + this.selected[0].id
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
          this.$root.alertNotify('positive', 'Se ha eliminado el registro exitosamente.', 'green', '', 'top')
        }).catch(error => {
          if (error.response.data.error) {
            this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 3000)
          } else {
            this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', '', 'top')
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
