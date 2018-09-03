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
        &#8220;Tell me what u wanna know Grodon.
        <span v-if="this.model != null"><br><strong> Forecast {{ forecastDays }} days {{ this.model }}/{{ this.currency }}, based on {{ days }} days w/ changepoint of {{ this.changepointPriorScale }}?</strong></span>&#8221;
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
      label="Ex: Bitcoin"
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
      label="Ex: USD"
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
        :max="100"
        :min="1"
        label="Forecast days"
        thumb-label="always"
      ></v-slider>
    </v-flex>
    <v-flex>
      <v-slider
        v-model="days"
        :max="365"
        :min="1"
        label="Based in how many days"
        thumb-label="always"
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
    days: 15,
    forecastDays: 3,
    changepointPriorScale: null,
    currency: null,
    currencyList: ['USD', 'BTC', 'ETH', 'EUR', 'JPY'],
    changepointList: [0.10,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.01],
    isLoading: false,
    items: [],
    model: null,
    search: null
  }),
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
