import Vue from 'vue'
import VueMap from './src/'

Vue.use(VueMap)

new Vue({
  el: '#app',
  render() {
    return <v-map><v-map-layer /></v-map>
  }
})

