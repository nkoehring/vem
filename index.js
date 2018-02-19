import Vue from 'vue'
import VEM from './src/'
import 'ol/ol.css'

Vue.use(VEM)

new Vue({
  el: '#app',
  render() {
    return <div>
      <vem-map style="display: inline-block; width: 45vw; margin: 2vw;"><vem-layer /></vem-map>
      <vem-map style="display: inline-block; width: 45vw; margin: 2vw;"><vem-layer /></vem-map>
    </div>
  }
})

