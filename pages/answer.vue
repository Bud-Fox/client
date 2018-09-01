<template>
  <v-layout>
    <v-flex v-if="this.$store.state.loading"><h1>loading</h1></v-flex>
    <v-flex text-xs-center v-else>
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
          x: this.$store.state.forecast.ds, y: this.$store.state.forecast.y, name: 'lucas', type: 'scatter'
        },
        {
          x: this.$store.state.forecast.ds, y: this.$store.state.forecast.yhat, name: 'hat', type: 'scatter'
        }
      ],
      layout: { title: 'lucas', xaxis: { type: 'date' }, yaxis: { title: 'yas' } },
      options: {}
    }
  }
}
</script>