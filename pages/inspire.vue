<template>
  <v-layout>
    <v-flex text-xs-center>
      <!-- {{ this.$store.state.ds }} -->

      <p>--</p>
      <!-- {{ this.$store.state.y }} -->
      {{ this.$store.state.asset.id }}
      <!-- {{ this.$store.state.forecast }} -->
      <!-- <p v-for="ds in this.$store.state.ds" :key="ds">{{ ds }}</p> -->
      <!-- <p v-for="i in this.$store.state.y" :key="i">{{ i }}</p> -->
      <vue-plotly :data="data" :layout="layout" :options="options"/>
      <p>--</p>
       <v-btn
        color="success"
        to="/inspire"
        @click="coisa"
      >Success</v-btn>
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
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
    coisa () {
      this.$store.commit('sendApi', {'ds': this.$store.state.ds, 'y': this.$store.state.y})
    }
  }
  // async fetch ({ store, params }) {
  //   store.dispatch('setCoins')
  // }
}
</script>