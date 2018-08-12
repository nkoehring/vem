<template>
  <vem-map>
    <tile-layer />
    <vector-layer :source="jsonData" :format="GeoJSON" :fitMapToThisLayer="true" />
  </vem-map>
</template>

<script>
import GeoJSON from 'ol/format/GeoJSON'
import jsonData from './data.json'
import VemMap from '../../../Map.vue'
import TileLayer from '../../../TileLayer.vue'
import VectorLayer from '../../../VectorLayer.vue'

export default {
  components: { VemMap, TileLayer, VectorLayer },
  data () {
    return { jsonData, GeoJSON }
  }
}
</script>

