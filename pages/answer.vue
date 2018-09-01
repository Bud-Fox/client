<template>
  <v-layout>
    <v-flex text-xs-center>
      <vue-plotly :data="data" :layout="layout" :options="options"/>
       <v-btn
        color="success"
        @click="requestProphet"
      >Success</v-btn>
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
  },
  methods: {
    requestProphet () {
      this.$store.commit('sendApi', {'ds': this.$store.state.ds, 'y': this.$store.state.y})
    }
  }
  // async fetch ({ store, params }) {
  //   store.dispatch('setCoins')
  // }
}
</script>