// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import WebRTC from 'vue-webrtc'
import 'vuetify/dist/vuetify.min.css'

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false
Vue.use(Vuetify, { iconfont: 'fa4' })
Vue.use(WebRTC)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
