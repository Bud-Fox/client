<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <!-- {{ this.$store.state.ds }} -->

      <p>--</p>
      <!-- {{ this.$store.state.y }} -->
      {{ this.$store.state.asset.id }}
      <!-- <p v-for="ds in this.$store.state.ds" :key="ds">{{ ds }}</p> -->
      <!-- <p v-for="i in this.$store.state.y" :key="i">{{ i }}</p> -->
      <vue-plotly :data="data" :layout="layout" :options="options"/>
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
      data: [{ x: this.$store.state.ds, y: this.$store.state.y }],
      layout: { title: 'lucas', xaxis: { type: 'date' } },
      options: {}
    }
  }
}
</script>