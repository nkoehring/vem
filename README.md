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
