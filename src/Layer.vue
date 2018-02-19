<template>
  <div class='v-map-layer'></div>
</template>

<script>
import VectorLayer from 'ol/layer/vector'
import TileLayer from 'ol/layer/tile'

import GenericSource from 'ol/source/source'
import TileSource from 'ol/source/tile'
import VectorSource from 'ol/source/vector'
import OSMSource from 'ol/source/osm'

export default {
  name: 'vem-layer',
  props: {
    // supported values: auto, tile, vector
    // 'auto' tries to guess the layer type from the source and is the default
    type: {
      type: String,
      default: 'auto'
    },
    source: {
      type: GenericSource,
      default: _ => new OSMSource()
    }
  },
  mounted () {
    let Layer
    if (this.type === 'tile') Layer = TileLayer
    else if (this.type === 'vector') Layer = VectorLayer
    else Layer = this.source instanceof TileSource ? TileLayer : VectorLayer

    this.$layer = new Layer({ source: this.source })
    console.log(this.source, this.$layer)
    // waiting for next tick to have parent fully initialised
    this.$nextTick(_ => this.$parent.$emit('addLayer', {layer: this.$layer}))
  }
}
</script>

