<template>
  <v-layout>
    <v-flex text-xs-center xs12>
      <h3 class="display-2 pt-4">{{ this.$store.state.assetName }} Interactive Chart</h3>
      {{ ds }}
      <!-- {{ this.$store.state.forecast }} -->
      <div class="elevation-8 my-5" ref="plot"></div>
      <v-btn
        color="secondary"
        large
        fab
        to="/ask"
      >Back</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Plotly from 'plotly.js-finance-dist'

export default {
  data: function () {
    return {
      data: [
        { x: this.$store.state.forecast.ds, y: this.$store.state.forecast.y, name: 'Price', type: 'scatter' },
        { x: this.$store.state.forecast.ds, y: this.$store.state.forecast.yhat, name: 'Hat', type: 'scatter' },
        { x: this.$store.state.forecast.ds, y: this.$store.state.forecast.trend, name: 'Trend', type: 'scatter' },
        {
          x: this.$store.state.forecast.ds,
          y: this.$store.state.forecast.yhat_upper,
          name: 'Upper Hat',
          type: 'scatter',
          fill: 'tonexty',
          fillcolor: 'rgba(0,201,253,.21)',
          mode: 'none'
        },
        {
          x: this.$store.state.forecast.ds,
          y: this.$store.state.forecast.yhat_lower,
          name: 'Lower Hat',
          type: 'scatter',
          fill: 'tonexty',
          fillcolor: 'rgba(252,201,5,.05)',
          mode: 'none'
        },
      ],
      layout: { 
        title: `${this.$store.state.assetName} Price Forecasting ${this.$store.state.forecastDays} days, Trend Changepoint: ${this.$store.state.changepointPriorScale*100}%`,
        xaxis: { type: 'date' },
        yaxis: {
          title: `Price (${this.$store.state.currency})`,
          side: 'right',
          showgrid: 'true',
          gridcolor: 'rgba(255,255,255,.05)'
        },
        legend: {
          orientation: 'h'
        },
        font: { color: 'rgb(255,255,255)' },
        plot_bgcolor: '#2d2929',
        paper_bgcolor: '#2d2929'
      }
    }
  },
  mounted () {
    Plotly.plot(
      this.$refs.plot,
      this.data,
      this.layout
    )
  },
  computed: {
    ds () {
      for (var i = 0; i < this.$store.state.forecast.ds.length; i++) {
        var date = new Date(this.$store.state.forecast.ds[i])
        this.$store.state.forecast.ds[i] = date
      }
    }
  }
}
</script>