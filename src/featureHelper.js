// somehow checking for instanceof olFeature doesn't always work?!
export function isFeature (x) {
  return !!(x && x.getGeometry && x.getGeometry.call)
}

export function parseFeatures (Format, featureProjection, data) {
  const reader = new Format({
    defaultDataProjection: 'EPSG:4326',
    featureProjection
  })
  return reader.readFeatures(data)
}

export function mapFeatureClass (feature, featureMap) {
  const classes = feature.get('class')
  for (const key in featureMap) {
    if (classes.indexOf(key) >= 0) return featureMap[key]
  }
}
