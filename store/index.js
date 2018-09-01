const axios = require('axios')
export const strict = false

export const state = () => ({
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
  },
  getCoins: (state, data) => {
    state.coins = data
  },
  sendApi: (state, data) => {
    return axios.post('http://localhost:5001/prophet', {'ds': data.ds, 'y': data.y})
      .then(res => {
        state.forecast = res.data
        state.loading = false
        $nuxt._router.push('/answer')
      })
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
