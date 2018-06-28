<template>
  
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'ChildChart',
  components: {
    Chart
  },
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    drawChart () {
      var ctx = document.getElementById('chart')
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
          datasets: [{
            label: 'Menor',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
              'green'
            ],
            borderWidth: 1
          },
          {
            label: 'Promedio OMS',
            data: [12, 50, 5, 5, 2, 3],
            borderColor: [
              'black'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }
  },
  mounted () {
    this.drawChart()
  }
}
</script>

<style>
</style>
