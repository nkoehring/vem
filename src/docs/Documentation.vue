<template>
  <section>
    <prop-doc :component="map"></prop-doc>
  </section>
</template>
<script>
import propDoc from 'propdoc'
import map from '../Map.vue'

export default {
  name: 'documentation',
  components: { propDoc },
  data() {
    return { map }
  }
}
</script>
