<template>
  <v-flex md6>
    <v-select
      v-model="asset"
      :items="coinsList"
      label="Select a crypto"
      outline
      persistent-hint
      return-object
      single-line
      item-text="name"
      item-value="id"
    ></v-select>
    <v-select
      v-model="currency"
      :items="currencyList"
      outline
      return-object
      single-line
    ></v-select>
    <v-flex xs12>
      <v-slider
        v-model="days"
        :max="800"
        :min="1"
        label="Days"
        thumb-label="always"
      ></v-slider>
    </v-flex>
    <v-flex xs12>
      <v-slider
        v-model="forecast"
        :max="100"
        :min="1"
        label="Forecast"
        thumb-label="always"
        inverse-label
      ></v-slider>
    </v-flex>
    <v-flex>
      <img src="/bud.jpg" alt="Vuetify.js" class="mb-5">
      <h2 class="mb-5 text-xs-center">"What do you wanna know Gordon? <br/> Forecast {{ forecast }} days {{ this.asset.name }}/{{ this.currency }}, based on {{ days }} days? ok"</h2>
    </v-flex>
    <v-btn
      color="success"
      to="/inspire"
      @click="requestPrices"
    >Go Bud Fox</v-btn>
  </v-flex>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    asset: { name: 'Bitcoin', id: 'bitcoin' },
    days: 90,
    forecast: 3,
    currency: 'USD',
    currencyList: ['USD', 'EUR', 'JPY', 'BTC', 'ETH']
  }),
  computed: {
    coinsList () {
      return this.$store.state.coins
    }
  },
  methods: {
    requestPrices () {
      return axios.get(`https://api.coingecko.com/api/v3/coins/${this.asset.id}/market_chart?vs_currency=${this.currency}&days=${this.days}`)
        .then(res => {
          this.$store.commit('getPrices', res.data)
        })
    }
  },
  async fetch ({ store, params }) {
    store.dispatch('setCoins')
  }
}
</script>
