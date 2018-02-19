<template>
  <div class='v-map'>
    <slot></slot>
  </div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Control from 'ol/control'
import Interaction from 'ol/interaction'

export default {
  name: 'vem-map',
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
    olOptions: Object
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
    })
    this.$on('removeLayer', ev => this.$olMap.removeLayer(ev.layer))

    console.log('MAP INITIALISED')
  }
}
</script>
