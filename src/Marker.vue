<template>
  <div class="map-marker"></div>
</template>

<script>
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import Style from 'ol/style/style'
import Icon from 'ol/style/icon'
import proj from 'ol/proj'
import Collection from 'ol/collection'
import Translate from 'ol/interaction/translate'

import defaultMarkerGraphic from './assets/default_marker.png'

export default {
  name: 'map-marker',
  props: {
    lon: {
      type: Number,
      default: 0.0
    },
    lat: {
      type: Number,
      default: 0.0
    },
    name: {
      type: String,
      default: 'Marker'
    },
    src: {
      type: String,
      default: defaultMarkerGraphic
    },
    // scaling factor for the marker
    // by default set to 1.0 or higher on hiRes (aka retina) displays
    scale: {
      type: Number,
      default: 1.0 / (window.devicePixelRatio || 1)
    },
    anchorX: {
      type: Number,
      default: 0.5
    },
    anchorY: {
      type: Number,
      default: 1.0
    },
    draggable: {
      type: Boolean,
      default: false
    },
    // resolution boundaries in which the marker is visible
    maxResolution: Number, // good default could be 0.15
    minResolution: Number
  },
  data () {
    return {
      ignoreNextUpdate: false,
      source: null
    }
  },
  watch: {
    lon (newLon) {
      if (this.ignoreNextUpdate) {
        // avoid infinite loops triggered by reactive updates
        this.ignoreNextUpdate = false
      } else {
        const p = new Point(proj.fromLonLat([newLon, this.lat]))
        this.feature.setGeometry(p)
      }
    },
    lat (newLat) {
      if (this.ignoreNextUpdate) {
        // avoid infinite loops triggered by reactive updates
        this.ignoreNextUpdate = false
      } else {
        const p = new Point(proj.fromLonLat([this.lon, newLat]))
        this.feature.setGeometry(p)
      }
    },
    draggable (draggable, wasDraggable) {
      if (draggable) {
        this.$parent.$emit('addInteraction', { interaction: this.translate })
      } else {
        this.$parent.$emit('removeInteraction', { interaction: this.translate })
      }
    },
    scale (newScale) {
      this.icon.setScale(newScale)
      this.feature.setStyle(new Style({ image: this.icon }))
    }
  },
  mounted () {
    this.feature = new Feature({
      geometry: new Point(proj.fromLonLat([this.lon, this.lat])),
      name: this.name,
    })
    this.icon = new Icon({
      src: defaultMarkerGraphic,
      anchor: [this.anchorX, this.anchorY],
      scale: this.scale
    })
    this.feature.setStyle(new Style({ image: this.icon }))
    const source = new VectorSource({ features: [this.feature] })
    this.layer = new VectorLayer({ source, zIndex: 1000 })

    if (this.minResolution) {
      this.layer.setMinResolution(this.minResolution)
    }
    if (this.maxResolution) {
      this.layer.setMaxResolution(this.maxResolution)
    }

    this.translate = new Translate({
      features: new Collection([this.feature]),
      layer: this.layer
    })
    this.translate.on('translateend', ev => {
      // lets not have infinite update loops, I hate that
      this.ignoreNextUpdate = true

      const feature = ev.features.getArray()[0]
      const extent = feature.getGeometry().getExtent()
      const lonLat = proj.toLonLat(extent)

      this.$emit('update:lon', lonLat[0])
      this.$emit('update:lat', lonLat[1])
    })

    this.$nextTick(_ => {
      this.$parent.$emit('addLayer', { layer: this.layer })
      if (this.draggable) {
        this.$parent.$emit('addInteraction', { interaction: this.translate })
      }
    })
  }
}
</script>
