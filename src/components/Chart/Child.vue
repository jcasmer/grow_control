<template>
  <div>
    <br>
    <div class="row xl-gutter">
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="chartType" :options="selectChartTypeOptions" separator float-label="Tipo de gráfica"/>
        <div class="lbl-error" v-if="errors.chartType != 0 && errors.chartType != null">
            {{ errors.chartType[0] }}
        </div>
      </div>
      <q-btn round color="secondary" size="md" @click="searchChart">
        <q-icon name="fas fa-chart-area" />
        <q-tooltip>Consultar</q-tooltip>
      </q-btn>
    </div>
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'ChildChartComponent',
  components: {
    Chart
  },
  props:
  {
    idChild: null
  },
  data () {
    return {
      myChart: null,
      chartType: null,
      errors: {
        chartType: null
      },
      selectChartTypeOptions: [
        {
          label: '',
          value: null
        },
        {
          label: 'Peso',
          value: 1
        },
        {
          label: 'Longitud',
          value: 2
        },
        {
          label: 'Masa Corporal',
          value: 3
        }
      ]
    }
  },
  methods: {
    drawChart () {
      var ctx = document.getElementById('chart')
      this.myChart = new Chart(ctx, {
      })
    },
    searchChart () {
      if (this.chartType === null) {
        this.errors.chartType = ''
      }
    }
  },
  mounted () {
    this.drawChart()
  }
}
</script>

<style>
</style>
