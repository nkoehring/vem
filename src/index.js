import Map from './Map'
import TileLayer from './TileLayer'
import VectorLayer from './VectorLayer'
import Marker from './Marker'

export default {
  install (Vue, options) {
    Vue.component('vem-map', Map)
    Vue.component('tile-layer', TileLayer)
    Vue.component('vector-layer', VectorLayer)
    Vue.component('map-marker', Marker)
  }
}
