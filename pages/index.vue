<template>
  <v-flex>
    <h2>{{ this.asset }}</h2>
    <h2>{{ this.currency }}</h2>
    <h2>{{ days }}</h2>
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
      ></v-slider>
    </v-flex>
  </v-flex>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    asset: { name: 'Bitcoin', id: 'btc' },
    days: 90,
    currency: 'USD',
    currencyList: ['USD', 'EUR', 'JPY', 'BTC', 'ETH']
  }),
  computed: {
    coinsList () {
      return this.$store.state.coins
    }
  },
  methods: {
    fas () {
      return axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=btc&days=1')
        .then(res => {
          this.$store.commit('getPrices', res.data)
        })
    }
  },
  async fetch ({ store, params }) {
    store.dispatch('setCoins')
    // return axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=btc&days=1')
    //   .then(res => {
    //     store.commit('getPrices', res.data)
    //   })
  }
}
</script>
