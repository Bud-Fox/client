export const state = () => ({
  asset: { name: 'Bitcoin', id: 'bitcoin' },
  days: 80,
  sidebar: false,
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
  sendToApi: (state, data) => {
    this.$axios.get('http://localhost:5001/coisa', {
      ds: state.ds,
      y: state.y
    })
  }
}

export const actions = {
  setCoins ({ commit }) {
    this.$axios.setHeader('accept-encoding', 'null')
    return this.$axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => {
        commit('getCoins', res.data)
      })
  },
  setPrices ({ commit, params }) {
    console.log(params)
    // this.$axios.setHeader('accept-encoding', 'null')
    // return this.$axios.get('https://api.coingecko.com/api/v3/coins/list')
    //   .then(res => {
    //     commit('getCoins', res.data)
    //   })
  }
}
