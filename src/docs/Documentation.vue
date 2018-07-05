<template>
  <section>
    <prop-doc :component="map"></prop-doc>
    <prop-doc :component="tileLayer"></prop-doc>
  </section>
</template>
<script>
import propDoc from 'propdoc'
import map from '../Map.vue'
import tileLayer from '../TileLayer.vue'

export default {
  name: 'documentation',
  components: { propDoc },
  data() {
    return { map, tileLayer }
  }
}
</script>
