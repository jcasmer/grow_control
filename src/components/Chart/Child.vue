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
        <q-icon name="fas fa-search" />
        <q-tooltip>Consultar</q-tooltip>
      </q-btn>
    </div>
    <div class="row xl-gutter">
      <q-btn  color="secondary" size="md">
        Ver Recomendaciones
      </q-btn>
    </div>
    <div class="chart-container chart" style="position: relative; height:40vh; width:80vw">
      <canvas id="chart" ></canvas>
    <br><br>
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
    drawChart (label, datas) {
      let typeLabelChart = ''
      if (this.chartType === 1) {
        typeLabelChart = 'Peso en kg'
      } else if (this.chartType === 2) {
        typeLabelChart = 'Altura en cms'
      } else if (this.chartType === 3) {
        typeLabelChart = 'Peso en kg'
      }
      var ctx = document.getElementById('chart')
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: label,
          datasets: [{
            label: '',
            data: datas,
            color: ['red'],
            borderColor: 'blue',
            fill: false
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: typeLabelChart,
                fontSize: 16,
                fontFamily: 'Arial',
                fontStyle: 'normal',
                fontColor: 'black'
              }
            }],
            xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'No. semanas apartir del nacimiento',
                fontSize: 16,
                fontFamily: 'Arial',
                fontColor: 'black'
              }
            }]
          }
        }
      })
    },
    searchChart () {
      if (this.chartType === null) {
        this.errors.chartType = ['Este campo no puede ser nulo.']
        return
      }
      let parameters = {
        idChild: this.idChild,
        chartType: this.chartType,
        is_active: 1
      }
      this.$axios.get('/chart-child/', {
        params: parameters
      }).then(response => {
        this.drawChart(response.data.label, response.data.data)
      }).catch(error => {
        if (error.response.data.error) {
          this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 3000)
        } else {
          this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', '', 'top')
        }
      })
    }
  }
  // mounted () {
  //   this.drawChart()
  // }
}
</script>

<style scoped>
/* .chart  */
</style>
