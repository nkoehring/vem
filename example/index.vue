<template>
  <div id="app">
    <header>
      <h1>VEM</h1>
    </header>
    <vem-map id="geojson-example" @click="onMapClick" :view.sync="mapView" :zoomToFeature="highlightedFeature">
      <tile-layer />
      <vector-layer :source="mapData" :format="GeoJSON" :fitMapToThisLayer="true" :styleMap="styleMap" :maxResolution="5" />
      <map-marker name="static" :lon="markerLon" :lat="markerLat" />
    </vem-map>
    <vem-map id="external-controls-example" @click="onMapClick" :syncImmediately="true" :view.sync="mapView">
      <tile-layer />
      <map-marker name="draggable" :lon.sync="markerLon" :lat.sync="markerLat" :draggable="true" :minZoom="10" />
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
      mapView: undefined, // will be updated thanks to `fitMapToThisLayer`
      markerLat: 52.4555,
      markerLon: 13.5
    }
  },
  methods: {
    onMapClick (ev) {
      console.log('clicked!', ev)
      const view = ev.originalEvent.map.getView()

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
