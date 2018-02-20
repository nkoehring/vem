# VEM

Vuejs Easy Maps

Simple but powerful maps in Vuejs2+ with OpenLayers.

## Minimal Example

```js
import Vue from 'vue'
import VEM from 'vem'

Vue.use(VEM)

new Vue({
  el: '#app',
  template: '<vem-map><vem-layer /></vem-map>'
})
```

This creates a map with default controls and an [OSM](https://openstreetmap.org) layer.

## GeoJSON

The following [Vue SFC](https://vuejs.org/v2/guide/single-file-components.html) renders [GeoJSON](https://macwright.org/2015/03/23/geojson-second-bite.html) data on top of an OSM layer.

```vue
<template>
  <vem-map>
    <vem-layer />
    <vem-layer :source="geojson" :format="GeoJSON" :fitMapToThisLayer="true" />
  </vem-map>
</template>

<script>
import GeoJSON from 'ol/format/geojson'
import jsonData from './src/assets/data.json'

export default {
  data () {
    return {
      geojson: jsonData.geojson
    }
  }
}
</script>
```

Notice the `fitMapToThisLayer` attribute. This sets the center and zoom of the map to exactly fit the extent of the given data in. It should (obviously) only be used once and is only supported on layers with an actual size. VEM tries to nicely abstract away the difference between [TileLayer](http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html) and [VectorLayer](http://openlayers.org/en/latest/apidoc/ol.layer.Vector.html) by automatically deciding which type is needed depending on the given source. Only VectorLayers have an actual size ('[extent](http://openlayers.org/en/latest/apidoc/ol.source.Vector.html#getExtent)'), which VEM can automatically fit into the viewport for you.

## Raw vs OpenLayers data objects

If a raw data source is given, the [format](http://openlayers.org/en/latest/apidoc/ol.format.html) needs to be set via the `format` attribute. This attribute is not necessary if the object given via `source` is already an OpenLayers format object:

```vue
<template>
  <vem-map>
    <vem-layer />
    <vem-layer :source="features" :fitMapToThisLayer="true" />
  </vem-map>
</template>

<script>
import GeoJSON from 'ol/format/geojson'
import jsonData from './src/assets/data.json'

export default {
  data () {
    return {
      // this might give strange results if your data isn't EPSG:4326 projected
      features: new GeoJSON().readFeatures(jsonData.geojson)
    }
  }
}
</script>
```

It is usually more convenient to use the format parameter because VEM handles the projection for you. If your data is not EPSG:3857 (aka WSG84, aka what you usually have on web-based maps) projected, you can tell VEM using the `projection` attribute. The default should work in most cases though.
