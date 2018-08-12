<template>
  <div class="tile-layer"><slot></slot></div>
</template>

<script>
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import TileSource from 'ol/source/Tile'

export default {
  name: 'map-layer',
  introduction: 'TileLayers are used for picture based maps like OpenStreetMap.',
  description: 'Creates a layer with tiles from the given data source and defaults to OpenStreetMap.',
  token: '<vem-map><tile-layer /></vem-map>',
  props: {
    source: {
      type: Object,
      default: function () { return new OSM() },
      note: 'Source object. Has to be an instance of `ol/source/tile`. Defaults to `ol/source/osm`. `static`'
    },
    opacity: {
      type: Number,
      default: 1,
      note: 'Sets opacity for layer from 0.0 (fully transparent) to 1.0 (fully opaque). `dynamic`'
    },
    visible: {
      type: Boolean,
      default: true,
      note: 'Layers can be hidden with this attribute. `dynamic`'
    },
    zIndex: {
      type: Number, default: 0,
      note: 'Sets the z-index. Tile layers default to 0, vector layers default to 1. `dynamic`'
    },
    extent: {
      type: Array,
      note: 'Set the extent at which the layer is visible. `dynamic`'
    }
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
