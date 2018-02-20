import VectorSource from 'ol/source/vector'

function getReader (Format, featureProjection) {
  return new Format({
    defaultDataProjection: 'EPSG:4326',
    featureProjection
  })
}

export default {
  name: 'vem-source',
  props: {
    data: {
      type: Object,
      required: true
    },
    format: {
      type: Function,
      required: true
    },
    projection: {
      type: String,
      default: 'EPSG:3857'
    }
  },
  render (h) {
    const dataReader = getReader(this.format, this.projection)
    const features = dataReader.readFeatures(this.data)
    const vectorSource = new VectorSource({ features })

    console.log('SOURCE OF TYPE', this.type)
    this.$nextTick(_ => this.$parent.$emit('setSource', {source: vectorSource}))
  }
}
