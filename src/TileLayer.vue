<template>
  <div class="tile-layer"><slot></slot></div>
</template>

<script>
import OSM from 'ol/source/osm'
import TileLayer from 'ol/layer/tile'
import TileSource from 'ol/source/tile'

export default {
  name: 'map-layer',
  props: {
    source: {type: TileSource, default: function () { return new OSM() }},
    opacity: {type: Number, default: 1},
    visible: {type: Boolean, default: true},
    zIndex: {type: Number, default: 0},
    extent: Array
  },
  data () {
    return {
      layer: null
    }
  },
  mounted () {
    const options = {
      opacity: this.opacity,
      visible: this.visible,
      zIndex: this.zIndex,
      extent: this.extent
    }

    this.layer = new TileLayer({ source: this.source, ...options })
    this.$nextTick(_ => this.$parent.$emit('addLayer', { layer: this.layer }))
  }
}
</script>
