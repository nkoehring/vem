import Map from './Map'
import Layer from './Layer'

export default {
  install (Vue, options) {
    Vue.component('vem-map', Map)
    Vue.component('vem-layer', Layer)
  }
}
