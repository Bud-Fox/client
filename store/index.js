const axios = require('axios')
export const strict = false

export const state = () => ({
  url: 'http://localhost:5001/prophet',
  asset: { name: 'Bitcoin', id: 'bitcoin' },
  days: 80,
  sidebar: false,
  loading: false,
  forecast: [],
  prices: [],
  coins: [],
  ds: [],
  y: []
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  getPrices: (state, data) => {
    state.loading = true
    state.forecast = []
    var ds = []
    var y = []
    for (var i = 0; i < data.prices.length; i++) {
      var date = new Date(data.prices[i][0])
      ds.push(date)
      y.push(data.prices[i][1])
    }
    state.ds = ds
    state.y = y
    return axios.post(state.url, {
      'dataset': {  
        'ds': ds,
        'y': y
      },
      'changepoint_prior_scale': 0.01,
      'forecast_days': 1
    }).then(res => {
        state.forecast = res.data
        state.loading = false
        $nuxt._router.push('/answer')
      })
  },
  getCoins: (state, data) => {
    state.coins = data
  }
}

export const actions = {
  setCoins ({ commit }) {
    return axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => {
        commit('getCoins', res.data)
      })
  }
}
