const axios = require('axios')
export const strict = false

export const state = () => ({
  url: 'https://radiant-forest-48616.herokuapp.com/prophet',
  sidebar: false,
  loading: false,
  changepointPriorScale: 0.01,
  forecastDays: 3,
  assetName: '',
  currency: '',
  forecast: {
    'ds': [1,2,3],
    'y': [1,2,3],
    'yhat': [1,2,3],
    'yhat_upper': [1,2,3],
    'yhat_lower': [1,2,3],
    'trend': [1,2,3],
  },
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
      'changepoint_prior_scale': state.changepointPriorScale,
      'forecast_days': state.forecastDays
    }).then(res => {
        state.forecast = res.data
        state.loading = false
        $nuxt._router.push('/answer')
      })
  },
  getCoins: (state, data) => {
    state.coins = data
  },
  getOptions: (state, data) => {
    state.forecastDays = data.forecastDays
    state.changepointPriorScale = data.changepointPriorScale
    state.assetName = data.asset.replace(/\w/, c => c.toUpperCase())
    state.currency = data.currency
  }
}

export const actions = {}
