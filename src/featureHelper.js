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

export function mapFeatureClasses (feature, featureMap) {
  const features = Object.keys(featureMap)
  const classProp = featureMap._classProp || 'class'
  let classList = feature.get(classProp)

  // the feature could have single class or a list of classes
  // this makes sure to always have an array to simplify the handling
  if (!Array.isArray(classList)) classList = [classList]

  return features
         .filter(key => classList.indexOf(key) >= 0)
         .map(key => featureMap[key])
}
