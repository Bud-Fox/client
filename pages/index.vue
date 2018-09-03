<template>
  <v-container align-content-space-around="true" md6>
    <v-flex
      xs12
      align-center
      justify-center
      layout
      text-xs-center
      class="mb-5"
    >
      <v-avatar
        :size="200"
        color="grey lighten-4"
      >
        <img src="/bud.jpg" alt="avatar">
      </v-avatar>
      <blockquote class="blockquote">
        &#8220;Tell me what u wanna know Grodon. <br> Forecast {{ forecastDays }} days {{ this.asset.name }}/{{ this.currency }}, based on {{ days }} days?&#8221;
        <footer>
          <small>
            <em>&mdash;Bud Fox</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
    <v-select
      v-model="asset"
      :items="coinsList"
      outline
      label="Coin"
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
    <v-select
      v-model="changepointPriorScale"
      :items="changepointList"
      outline
      label="Changepouint"
      return-object
      single-line
    ></v-select>
    <v-flex>
      <v-slider
        v-model="days"
        :max="800"
        :min="1"
        label="Days"
        thumb-label="always"
      ></v-slider>
    </v-flex>
    <v-flex>
      <v-slider
        v-model="forecastDays"
        :max="100"
        :min="1"
        label="Forecast"
        thumb-label="always"
        inverse-label
      ></v-slider>
    </v-flex>
    <v-flex v-if="this.$store.state.loading">
      <h1>loading</h1>
    </v-flex>
    <v-flex
      xs12
      align-center
      justify-center
      layout
      text-xs-center
      v-else
    >
      <v-btn
        color="secondary"
        large
        fab
        @click="requestPrices"
      >Yeah</v-btn>
    </v-flex>
  </v-container>
  
  
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    asset: { name: 'Bitcoin', id: 'bitcoin' },
    days: 90,
    forecastDays: 3,
    changepointPriorScale: 0.01,
    currency: 'USD',
    currencyList: ['USD', 'BTC', 'ETH', 'EUR', 'JPY'],
    changepointList: [0.09, 0.07, 0.05, 0.01]
  }),
  computed: {
    coinsList () {
      return this.$store.state.coins
    }
  },
  methods: {
    requestPrices () {
      console.log(this.asset.id, this.days, this.currency)
      return axios.get(`https://api.coingecko.com/api/v3/coins/${this.asset.id}/market_chart?vs_currency=${this.currency}&days=${this.days}`)
        .then(res => {
          this.$store.commit('getOptions', {
            forecastDays: this.forecastDays,
            changepointPriorScale: this.changepointPriorScale,
            asset: this.asset.name,
            currency: this.currency
          })
          this.$store.commit('getPrices', res.data)
        })
    }
  },
  beforeCreate() {
    return axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => {
        this.$store.commit('getCoins', res.data)
      })
  }
  // async fetch ({ store, params }) {
  //   store.dispatch('setCoins')
  // }
}
</script>
