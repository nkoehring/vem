import Map from './Map'
import Layer from './Layer'
import Source from './Source'

export default {
  install (Vue, options) {
    Vue.component('vem-map', Map)
    Vue.component('vem-layer', Layer)
    Vue.component('vem-source', Source)
  }
}
