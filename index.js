import Vue from 'vue'
import VEM from './src/'
import OSM from 'ol/source/osm'
import GeoJSON from 'ol/format/geojson'
import 'ol/ol.css'

import Style from 'ol/style/style'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Text from 'ol/style/text'

import levelData from './src/assets/level01.json'

const styleMap = {
  default: new Style({
    stroke: new Stroke({ color: '#999', width: 1 }),
    fill: new Fill({ color: '#FFF' }),
    text: new Text({
      font: '14px Calibri,sans-serif',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({ color: '#FFF', width: 3 })
    })
  }),
  outer: new Style({
    stroke: new Stroke({ color: '#999', width: 10 }),
    fill: new Fill({ color: '#F5F5F5' }),
    text: null
  })
}

Vue.use(VEM)

new Vue({
  el: '#app',
  render() {
    return <div>
      <vem-map>
        <vem-layer
          source={levelData.venueLevelGeoJSON}
          format={GeoJSON}
          fitMapToThisLayer={true}
          styleMap={styleMap}
        />
      </vem-map>
    </div>
  }
})

