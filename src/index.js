import Map from './Map'
import Layer from './Layer'

export default {
  install (Vue, options) {
    Vue.component('v-map', Map)
    Vue.component('v-map-layer', Layer)
  }
}
