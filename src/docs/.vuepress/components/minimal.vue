<template>
  <vem-map><tile-layer /></vem-map>
</template>

<script>
import VemMap from '../../../Map.vue'
import TileLayer from '../../../TileLayer.vue'

export default {
  components: { VemMap, TileLayer }
}
</script>

<style src="ol/ol.css"></style>
