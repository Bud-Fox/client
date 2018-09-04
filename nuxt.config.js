const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/live/'
  }
} : {}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Bud Fox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bud Fox using Nuxt.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://raw.githubusercontent.com/Bud-Fox/live/master/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  ...routerBase,
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxyHeader: false
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#b38457' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'plotly.js'
    ],
    publicPath: 'https://bud-fox.github.io/live/',
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
