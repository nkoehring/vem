<template>
  <div class='vem-map'>
    <slot></slot>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import { defaults as defaultInteractions } from 'ol/interaction'
import { fromLonLat, toLonLat } from 'ol/proj'
import { isFeature } from './featureHelper'

export default {
  name: 'vem-map',
  introduction: 'Container component to initialize a map.',
  description: 'Creates map instances and is the container for all layers and markers.',
  token: '<vem-map><!-- see TileLayer and VectorLayer --></vem-map>',
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
      }),
      note: 'Object to set initial map view. Can be synced.'
    },
    zoomToFeature: {
      validator: isFeature,
      note: 'A map feature to zoom to. If set dynamically, the former view state is put on a stack and the map reverts to it after unsetting this.'
    },
    zoomToExtent: {
      type: Array, // type olExtent: [minx,miny,maxx,maxy]
      note: 'Same as `zoomToFeature` but using an extent, which is an array in the form of [min x, min y, max x, max y] coordinates.'
    },
    syncImmediately: {
      type: Boolean,
      default: false,
      note: 'If set to true, the map emits events for every movement step instead of waiting for moveEnd.'
    },
    olOptions: {
      type: Object,
      note: 'Object with options given the OpenLayers map on initialization.'
    }
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

      if (Array.isArray(lonlat)) view.setCenter(fromLonLat(lonlat))
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
      controls: defaultControls(),
      interactions: defaultInteractions(),
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
      this.$olMap.addLayer(ev.layer)

      if (ev.minResolution) {
        ev.layer.setMinResolution(ev.minResolution)
      } else if (ev.maxZoom) {
        const resolution = this.$olMap.getView().getResolutionForZoom(ev.maxZoom)
        ev.layer.setMinResolution(resolution)
      }
      if (ev.maxResolution) {
        ev.layer.setMaxResolution(ev.maxResolution)
      } else if (ev.minZoom) {
        const resolution = this.$olMap.getView().getResolutionForZoom(ev.minZoom)
        ev.layer.setMaxResolution(resolution)
      }
      if (ev.layer.type === 'VECTOR' && ev.fitMapToLayer) {
        this.$olMap.getView().fit(ev.layer.getSource().getExtent())
      }
    })
    this.$on('removeLayer', ev => this.$olMap.removeLayer(ev.layer))

    this.$on('addInteraction', ev => this.$olMap.addInteraction(ev.interaction))
    this.$on('removeInteraction', ev => this.$olMap.removeInteraction(ev.interaction))

    this.$olMap.on('click', ev => {
      const feature = ev.map.forEachFeatureAtPixel(ev.pixel, f => f)
      this.$emit('click', {
        pixel: ev.pixel,
        lonlat: toLonLat(ev.coordinate),
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
        lonlat: toLonLat(view.getCenter()),
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
            lonlat: toLonLat(view.getCenter()),
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
