const xDisplacementPattern = (time, amplitude, actualPosition) => ({
  x: Math.sin(time) * amplitude + actualPosition.x,
  y: actualPosition.y,
  z: actualPosition.z
})

const yDisplacementPattern = (time, amplitude, actualPosition) => ({
  x: actualPosition.x,
  y: Math.cos(time) * amplitude + actualPosition.y,
  z: actualPosition.z
})

const zDisplacementPattern = (time, amplitude, actualPosition) => ({
  x: actualPosition.x,
  y: actualPosition.y,
  z: Math.sin(time) * amplitude + actualPosition.z
})

const roundDisplacementPattern = (time, amplitude, actualPosition) => ({
  x: Math.sin(time) * amplitude + actualPosition.x,
  y: actualPosition.y,
  z: Math.cos(time) * amplitude + actualPosition.z
})

const roundReverseDisplacementPattern = (time, amplitude, actualPosition) => ({
  x: Math.cos(time) * amplitude + actualPosition.x,
  y: actualPosition.y,
  z: Math.sin(time) * amplitude + actualPosition.z
})

export const applyPattern = (pattern, time, amplitude, actualPosition) => {
  const patchedAmplitude = 0.1
  if (pattern === 'x') {
    return xDisplacementPattern(time, patchedAmplitude, actualPosition)
  } else if (pattern === 'y') {
    return yDisplacementPattern(time, patchedAmplitude, actualPosition)
  } else if (pattern === 'z') {
    return zDisplacementPattern(time, patchedAmplitude, actualPosition)
  } else if (pattern === 'round') {
    return roundDisplacementPattern(time, patchedAmplitude, actualPosition)
  } else if (pattern === 'round_reverse') {
    return roundReverseDisplacementPattern(time, patchedAmplitude, actualPosition)
  } else {
    return actualPosition
  }
}
