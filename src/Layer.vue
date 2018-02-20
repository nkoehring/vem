<template>
  <div class="vem-layer"><slot></slot></div>
</template>

<script>
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import TileLayer from 'ol/layer/tile'
import TileSource from 'ol/source/tile'
import Feature from 'ol/format/feature'
import Style from 'ol/style/style'
import { parseFeatures, mapFeatureClass } from './featureHelper'

export default {
  name: 'vem-layer',
  props: {
    source: {type: Object, required: true},
    fitMapToThisLayer: {type: Boolean, default: false},
    opacity: {type: Number, default: 1},
    visible: {type: Boolean, default: true},
    zIndex: {type: Number, default: 0},
    projection: {type: String, default: 'EPSG:3857'},
    styleMap: {type: Object, default: _ => ({})},
    format: Function,
    extent: Array
  },
  data () {
    return {
      layer: null
    }
  },
  mounted () {
    const defaultStyle = this.styleMap ? this.styleMap.default : Style.defaultFunction()
    const styleFunc = feature => {
      const mappedStyle = mapFeatureClass(feature, this.styleMap)
      return mappedStyle || defaultStyle
    }
    const options = {
      opacity: this.opacity,
      visible: this.visible,
      zIndex: this.zIndex,
      extent: this.extent,
      style: styleFunc
    }

    if (this.source instanceof TileSource) {
      this.layer = new TileLayer({ source: this.source, ...options })
    } else if (this.source instanceof VectorSource) {
      this.layer = new VectorLayer({ source: this.source, ...options })
    } else if (this.format) {
      const features = parseFeatures(this.format, this.projection, this.source)
      const source = new VectorSource({ features })
      this.layer = new VectorLayer({ source, ...options })
    }

    if (this.layer.type === 'VECTOR' && !options.zIndex) {
      this.layer.setZIndex(1)
    }

    this.$nextTick(_ => this.$parent.$emit('addLayer', {
      layer: this.layer,
      fitMapToLayer: this.fitMapToThisLayer
    }))
  }
}
</script>
