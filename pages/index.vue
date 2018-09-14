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
        <img src="https://raw.githubusercontent.com/Bud-Fox/live/master/bud.jpg" alt="avatar">
      </v-avatar>
      <blockquote class="blockquote">
        <span v-if="this.model != null">&#8220;Forecast <strong>{{ forecastDays }}</strong> days <strong>{{ this.model.toUpperCase() }}/{{ this.currency }}</strong>, based on <strong>{{ days }}</strong> days w/ changepoint of <strong>{{ this.changepointPriorScale }}</strong>?&#8221;</span>
        <footer>
          <small>
            <em>&mdash;Bud Fox</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      item-text="name"
      item-value="id"
      label="Asset"
      solo
      outline
      class="mb-1"
    >
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            Literally <strong>ANY</strong> cryptocurrency
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template
        slot="selection"
        slot-scope="{ item }"
      >
        <span v-text="item.name"></span>
      </template>
      <template
        slot="item"
        slot-scope="{ item, tile }"
      >
        <v-list-tile-avatar
          color="secondary"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </v-autocomplete>
    <v-select
      v-model="currency"
      :items="currencyList"
      outline
      return-object
      label="Currency"
      single-line
    ></v-select>
    <v-select
      v-model="changepointPriorScale"
      :items="changepointList"
      outline
      label="Changepoint Prior Scale"
      return-object
      single-line
    ></v-select>
    <v-flex>
      <v-slider
        v-model="forecastDays"
        :max="10"
        :min="1"
        label="Forecast days"
        thumb-label="always"
      ></v-slider>
    </v-flex>
    <v-flex>
      <v-slider
        v-model="days"
        :max="60"
        :min="1"
        label="Based in how many days"
        thumb-label="always"
      ></v-slider>
    </v-flex>
    <v-flex
      v-if="this.$store.state.loading"
      xs12
      align-center
      justify-center
      layout
      text-xs-center
      class="mb-5"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
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
    days: 15,
    forecastDays: 2,
    changepointPriorScale: null,
    currency: null,
    currencyList: ['USD', 'BTC', 'ETH', 'EUR', 'JPY'],
    changepointList: [0.01,0.02,0.03,0.04,0.05,0.06,0.07],
    isLoading: false,
    items: [],
    model: null,
    search: null
  }),
  asyncData: () => {
    axios.get('https://radiant-forest-48616.herokuapp.com/ping')
      .then(res => {
        console.log('Server says:', res.data)
      })
  },
  methods: {
    requestPrices () {
      console.log(this.model, this.days, this.currency)
      return axios.get(`https://api.coingecko.com/api/v3/coins/${this.model}/market_chart?vs_currency=${this.currency}&days=${this.days}`)
        .then(res => {
          this.$store.commit('getOptions', {
            forecastDays: this.forecastDays,
            changepointPriorScale: this.changepointPriorScale,
            asset: this.model,
            currency: this.currency
          })
          this.$store.commit('getPrices', res.data)
        })
    }
  },
  watch: {
    search (val) {
      if (this.items.length > 0) return
      this.isLoading = true
      axios.get('https://api.coingecko.com/api/v3/coins/list')
        .then(res => {
          this.items = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>