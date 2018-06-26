<template>
  <div id="app">
    <header>
      <h1>VEM</h1>
    </header>
    <vem-map id="geojson-example" @click="onMapClick" :view.sync="mapView" :zoomToFeature="highlightedFeature">
      <tile-layer />
      <vector-layer :source="mapData" :format="GeoJSON" :fitMapToThisLayer="true" :styleMap="styleMap" />
    </vem-map>
    <vem-map id="external-controls-example" @click="onMapClick" :view.sync="mapView">
      <tile-layer />
    </vem-map>
  </div>
</template>

<script>
import GeoJSON from 'ol/format/geojson'
import mapData from 'raw-loader!./map.geojson'
import styleMap from './styleMap.js'

export default {
  name: 'VEM-TEST-APP',
  data () {
    return {
      GeoJSON,
      mapData,
      styleMap,
      highlightedFeature: null,
      mapView: undefined
    }
  },
  methods: {
    onMapClick (ev) {
      console.log('clicked!', ev)

      // reset to null if the last clicked feature is clicked again
      if (this.highlightedFeature === ev.feature) {
        this.highlightedFeature = null
      } else {
        this.highlightedFeature = ev.feature
      }
    }
  }
}
</script>

<style>
.vem-map {
  width: 50vw;
  margin: 1em auto;
}
</style>
