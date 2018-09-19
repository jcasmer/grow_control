<template>
  <div>
    <br>
    <div class="row xl-gutter">
      <div class="col-lg-4 col-xs-12 padding">
        <q-select v-model="chartType" :options="selectChartTypeOptions" separator float-label="Tipo de gráfica" @input="showChart"/>
        <div class="lbl-error" v-if="errors.chartType != 0 && errors.chartType != null">
            {{ errors.chartType[0] }}
        </div>
      </div>
      <q-btn round color="secondary" size="md" @click="searchChart">
        <q-icon name="fas fa-search" />
        <q-tooltip>Consultar</q-tooltip>
      </q-btn>
    </div>
    <br>
    <div class="row xl-gutter" v-show="suggestions">
      <div class="col-lg-3 col-xs-6 padding">
        <q-input inverted color="deep-orange" readonly v-model="status" float-label="Estado del menor">
        </q-input>
      </div>
      <q-btn round color="primary" size="md" @click="searchSuggestions">
        <q-icon name="fas fa-medkit" />
        <q-tooltip>Ver Recomendaciones</q-tooltip>
      </q-btn>
    </div>
    <hr v-show="suggestions">
    <div class="row">
      <div class="col-lg-6 col-xs-6 chartWrapper padding">
        <h5 v-show="suggestions">Gráfica del menor:</h5>
        <div class="chartAreaWrapper">
          <div class="chart-container chart" style="position: relative; height:100%; width:40vw" v-show="suggestions">
            <canvas id="chart" ></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-6 chartWrapper padding">
        <h5 v-show="suggestions">Gráfica OMS:</h5>
        <div class="chartAreaWrapper">
          <div class="chart-container chart" style="position: relative; height:100%; width:40vw" v-show="suggestions">
            <canvas id="omsChart" ></canvas>
          </div>
        </div>
      </div>
    </div>
    <br>
    <q-modal v-model="opened"  :content-css="{maxWidth: '80vw', minHeight: '50vh'}" no-backdrop-dismiss
      no-esc-dismiss
    >
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Recomendaciones para el estado: {{status}}
          </q-toolbar-title>
        </q-toolbar>
        <q-list highlight>
          <q-list-header><hr></q-list-header>
          <q-item v-for="item in advices" :key="item.id" class="col-lg-6 col-xs-6">
             <q-item-side left icon="fas fa-circle" />
             {{item.description}}
          </q-item>
        </q-list>
        <br>
        <div class="padding text-left">
          <q-btn
            color="primary"
            @click="opened = false"
            label="Cerrar"
          />
        </div>
        <br>
      </q-modal-layout>
    </q-modal>
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
      suggestions: false,
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
      ],
      status: '',
      opened: false,
      advices: []
    }
  },
  methods: {
    drawChart (label, datas, idChart, oms) {
      let typeLabelChart = ''
      let labelChart = ''
      let textString = 'No. semanas apartir del nacimiento'
      if (this.chartType === 1) {
        typeLabelChart = 'Peso en kg'
        labelChart = 'Peso'
      } else if (this.chartType === 2) {
        typeLabelChart = 'Altura en cms'
        labelChart = 'Altura'
        textString = 'No. meses apartir del nacimiento'
      } else if (this.chartType === 3) {
        labelChart = 'IMC'
        typeLabelChart = 'IMC'
        textString = 'No. meses apartir del nacimiento'
      }
      let color = 'blue'
      if (oms) {
        color = 'red'
      }
      var ctx = document.getElementById(idChart)
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: label,
          datasets: [{
            label: labelChart,
            data: datas,
            color: ['red'],
            borderColor: color,
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
                labelString: textString,
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
        this.drawChart(response.data.label, response.data.data, 'chart', false)
        this.drawChart(response.data.oms.label, response.data.oms.data, 'omsChart', true)
        this.suggestions = true
        this.status = response.data.status
      }).catch(error => {
        if (error.response.data.error) {
          this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 3000)
        } else {
          this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', '', 'top')
        }
      })
    },
    showChart () {
      if (this.chartType === null) {
        this.suggestions = false
      }
    },
    searchSuggestions () {
      let parameters = {
        status: this.status
      }
      this.$axios.get('/suggestions/', {
        params: parameters
      }).then(response => {
        this.suggestions = true
        this.advices = response.data.advices
        this.opened = true
      }).catch(error => {
        this.opened = false
        if (error.response.data.error) {
          this.$root.alertNotify('negative', error.response.data.error, 'red', '', 'top', 3000)
        } else {
          this.$root.alertNotify('negative', 'Se han presentado errores.', 'red', '', 'top')
        }
      })
    }
  }
}
</script>

<style scoped>
.chartWrapper {
    position: relative;
}

.chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events:none;
}

.chartAreaWrapper {
    width: 800px;
    overflow-x: scroll;
}
</style>
