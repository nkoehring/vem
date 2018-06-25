import 'ol/ol.css'
import Style from 'ol/style/style'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Text from 'ol/style/text'

export default {
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
