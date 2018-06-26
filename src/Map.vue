<template>
  <div class='vem-map'>
    <slot></slot>
  </div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Control from 'ol/control'
import Interaction from 'ol/interaction'
import proj from 'ol/proj'
import { isFeature } from '@/featureHelper'

export default {
  name: 'vem-map',
  data () {
    return {
      ignoreNextUpdate: false,
      ignoreAllUpdates: false,
      savedState: null
    }
  },
  props: {
    view: {
      type: Object,
      default: _ => ({
        lon: 0.0,
        lat: 0.0,
        zoom: 2.0,
        rotation: 0.0
      })
    },
    zoomToFeature: {
      validator: isFeature
    },
    zoomToExtent: Array, // type olExtent: [minx,miny,maxx,maxy]
    syncImmediately: {
      type: Boolean,
      default: false
    },
    olOptions: Object
  },
  watch: {
    view (newView) {
      if (this.ignoreAllUpdates) {
        return
      }
      if (this.ignoreNextUpdate) {
        // avoid infinite loops triggered by reactive updates
        this.ignoreNextUpdate = false
        return
      }

      const view = this.$olMap.getView()
      const { lonlat, zoom, rotation } = newView

      if (Array.isArray(lonlat)) view.setCenter(proj.fromLonLat(lonlat))
      if (typeof zoom === 'number') view.setZoom(zoom)
      if (typeof rotation === 'number') view.setRotation(rotation)
    },
    zoomToExtent (extent, oldExtent) {
      this.toggleZoom(extent, oldExtent)
    },
    zoomToFeature (feature, oldFeature) {
      const extent = isFeature(feature) ? feature.getGeometry().getExtent() : null
      const oldExtent = isFeature(oldFeature) ? oldFeature.getGeometry().getExtent() : null
      this.toggleZoom(extent, oldExtent)
    }
  },
  methods: {
    toggleZoom (extent, oldExtent) {
      if (extent) {
        if (!oldExtent) {
          // save the map state only if not zoomed already
          const view = this.$olMap.getView()
          this.savedState = {
            center: view.getCenter(),
            zoom: view.getZoom()
          }
        }
        this.$olMap.getView().fit(extent, {
          duration: 300,
          constrainResolution: false
        })
      } else if (!extent && oldExtent) {
        // zoom out, back to the saved state
        this.$olMap.getView().animate({...this.savedState, duration: 300})
      }
    }
  },
  mounted () {
    const options = {
      target: this.$el,
      controls: Control.defaults(),
      interactions: Interaction.defaults(),
      loadTilesWhileAnimating: true,
      layers: [],
      view: new View({
        center: [this.view.lon, this.view.lat],
        zoom: this.view.zoom,
        rotation: this.view.rotation
      }),
      ...this.olOptions // this overwrites / adds to defaults
    }
    this.$olMap = new Map(options)

    this.$on('addLayer', ev => {
      console.log('adding layer', ev)
      this.$olMap.addLayer(ev.layer)
      if (ev.layer.type === 'VECTOR' && ev.fitMapToLayer) {
        this.$olMap.getView().fit(ev.layer.getSource().getExtent())
      }
    })
    this.$on('removeLayer', ev => this.$olMap.removeLayer(ev.layer))
    this.$olMap.on('click', ev => {
      const feature = ev.map.forEachFeatureAtPixel(ev.pixel, f => f)
      this.$emit('click', {
        pixel: ev.pixel,
        lonlat: proj.toLonLat(ev.coordinate),
        pointerEvent: ev.pointerEvent,
        originalEvent: ev,
        feature
      })
    })
    this.$olMap.on('moveend', ev => {
      const view = this.$olMap.getView()

      // lets not have infinite update loops, I hate that
      this.ignoreAllUpdates = false
      this.ignoreNextUpdate = true

      this.$emit('update:view', {
        lonlat: proj.toLonLat(view.getCenter()),
        zoom: view.getZoom(),
        rotation: view.getRotation()
      })
    })
    if (this.syncImmediately) {
      this.$olMap.on('movestart', ev => {
        this.ignoreAllUpdates = true
      })
      this.$olMap.on('pointerdrag', ev => {
        this.$nextTick(() => {
          const view = this.$olMap.getView()

          this.$emit('update:view', {
            lonlat: proj.toLonLat(view.getCenter()),
            zoom: view.getZoom(),
            rotation: view.getRotation()
          })
        })
      })
    }

    console.log('MAP INITIALISED')
  }
}
</script>
