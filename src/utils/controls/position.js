export function isPositionInCheckpoints(position, checkpointsData) {
  if (!checkpointsData || !checkpointsData.checkpoints) {
    console.error('No se encontraron checkpoints en el JSON.')
    return false
  }

  return checkpointsData.checkpoints.some(
    (cp) => JSON.stringify(cp.position) === JSON.stringify(position)
  )
}
