export const state = () => ({
  sidebar: false,
  prices: [],
  coins: []
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  getPrices: (state, data) => {
    state.prices = data.prices
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
  }
}
