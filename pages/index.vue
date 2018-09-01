<template>
  <v-container align-content-space-around="true" md6>
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
      md6
    ></v-select>
    <v-select
      v-model="currency"
      :items="currencyList"
      outline
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
        v-model="forecast"
        :max="100"
        :min="1"
        label="Forecast"
        thumb-label="always"
        inverse-label
      ></v-slider>
    </v-flex>
    <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-xs-center
      >
        <v-avatar
          :size="200"
          color="grey lighten-4"
        >
          <img src="/bud.jpg" alt="avatar">
        </v-avatar>
        <blockquote class="blockquote">
          &#8220;Tell me what u wanna know Grodon. <br> Forecast {{ forecast }} days {{ this.asset.name }}/{{ this.currency }}, based on {{ days }} days?&#8221;
          <footer>
            <small>
              <em>&mdash;Bud Fox</em>
            </small>
          </footer>
        </blockquote>
        <v-btn
          color="info"
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
      console.log(this.asset.id, this.days, this.currency)
      return axios.get(`https://api.coingecko.com/api/v3/coins/${this.asset.id}/market_chart?vs_currency=${this.currency}&days=${this.days}`)
        .then(res => {
          this.$store.commit('getPrices', res.data)
          this.$store.commit('sendApi', {'ds': this.$store.state.ds, 'y': this.$store.state.y})
        })
    }
  },
  async fetch ({ store, params }) {
    store.dispatch('setCoins')
  }
}
</script>
