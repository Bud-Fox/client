<template>
  <v-layout>
    <v-flex v-if="this.$store.state.loading"><h1>loading</h1></v-flex>
    <v-flex text-xs-center v-else>
      {{ ds }}
      <!-- {{ this.$store.state.forecast }} -->
      <vue-plotly :data="data" :layout="layout" :options="options"/>
      <v-btn
        color="info"
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
        {
          x: this.$store.state.forecast.ds, y: this.$store.state.forecast.y, name: 'price', type: 'scatter'
        },
        {
          x: this.$store.state.forecast.ds, y: this.$store.state.forecast.yhat, name: 'yhat', type: 'scatter'
        },
        {
          x: this.$store.state.forecast.ds, y: this.$store.state.forecast.trend, name: 'trend', type: 'scatter'
        }
      ],
      layout: { title: 'forecast', xaxis: { type: 'date' }, yaxis: { title: 'Price' } },
      options: {}
    }
  },
  computed: {
    ds () {
      for (var i = 0; i < this.$store.state.forecast.ds.length; i++) {
        var date = new Date(this.$store.state.forecast.ds[i])
        this.$store.state.forecast.ds[i] = date
        console.log(this.$store.state.forecast.ds[i])
      }
    }
  }
}
</script>