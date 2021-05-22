// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { sha256 } from 'js-sha256'
import { Base64 } from 'js-base64'
import axios from "axios"

axios.defaults.baseURL = 'http://192.168.43.159:9426/api/v2/'
// axios.defaults.baseURL = 'http://127.0.0.1:9426/api/v2/'
axios.interceptors.request.use(config => {
  config.headers.Digest = 'SHA-256=' + window.sessionStorage.getItem('base64')
  return config
})
Vue.config.productionTip = false
Vue.use(elementui)
Vue.prototype.$sha256 = sha256
Vue.prototype.$base64 = Base64
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
