import Vue from 'vue'
import VEM from '../src/'
import 'ol/ol.css'
import App from './index.vue'

Vue.use(VEM)

new Vue({
  el: '#app',
  render: h => h(App)
})

