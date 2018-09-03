<template>
  <v-layout>
    <v-flex text-xs-center xs12>
      {{ ds }}
      <vue-plotly :data="data" :layout="layout" :options="options"/>
      <v-btn
        large
        to="/"
      >Ask again</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'

export default {
  components: {
    VuePlotly
  },
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
        title: `${this.$store.state.assetName} Price Forecasting ${this.$store.state.forecastDays} days, ${this.$store.state.changepointPriorScale} Scale`,
        xaxis: { type: 'date' },
        yaxis: { title: `Price (${this.$store.state.currency})` },
        font: { color: 'rgb(255,255,255)' },
        plot_bgcolor: '#2d2929',
        paper_bgcolor: '#2d2929'
      },
      options: {}
    }
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