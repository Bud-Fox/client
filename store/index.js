export const state = () => ({
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
      ds.push(data.prices[i][0])
      y.push(data.prices[i][1])
    }
    state.ds = ds
    state.y = y
  },
  getCoins: (state, data) => {
    state.coins = data
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
