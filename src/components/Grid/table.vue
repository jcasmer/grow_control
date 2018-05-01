<template>
  <q-table ref="grwTable"
    :title="nameTable"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="id"
    :loading= loading
    separator = "horizontal"
    @request="request"
  />
</template>

<script>
export default {
  name: 'GrowTable',
  data () {
    return {
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10
      }
    }
  },
  props: {
    columns: Array,
    serverData: Object,
    filter: '',
    nameTable: null,
    url: '',
    editUrl: '',
    btnDelete: true,
    btnEdit: true
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      // .get(`/data/${pagination.page}?sortBy=${pagination.sortBy}&ordering=${pagination.descending}&filter=${filter}`)
      this.$axios.get(this.url).then(response => {
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
        this.$root.alertNotify('negative', String(error), 'red', 'thumb_down', 'top', 3000)
        this.loading = false
      })
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
  // updated () {
  //   this.request({
  //     pagination: this.serverPagination,
  //     filter: this.filter
  //   })
  // }
}
</script>

<style>
</style>
