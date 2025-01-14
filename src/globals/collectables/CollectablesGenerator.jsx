import React, { useState, useEffect } from 'react'
import Collectable from './Collectable'
import DiamondCone from './DiamondCone'

const debug = true

function print_debug(text) {
  if (debug) {
    console.log(`[CollectablesGenerator.jsx]: ${text}`)
  }
}

export default function Collectables({ collectablesData }) {
  const [collectables, setCollectables] = useState([])

  // Inicializar coleccionables desde los datos proporcionados
  useEffect(() => {
    setCollectables(collectablesData.collectables)
  }, [collectablesData])

  // Depuración de cambios en el estado de los coleccionables
  useEffect(() => {
    print_debug('Change on collectables:', collectables)
  }, [collectables])

  // Actualizar el estado de un coleccionable específico
  const updateCollectableState = (id, newState) => {
    setCollectables((prevCollectables) =>
      prevCollectables.map((collectable) =>
        collectable.id === id ? { ...collectable, ...newState } : collectable
      )
    )
  }

  return (
    <>
      {collectables.map((collectable) => (
        <Collectable
          key={collectable.id}
          soundEffect={collectable.soundEffect || 'diamondCollect'}
          colliderName={
            collectable.colliderName || 'character-capsule-collider'
          }
          onUpdateState={(newState) =>
            updateCollectableState(collectable.id, newState)
          }
        >
          <DiamondCone position={collectable.position} />
        </Collectable>
      ))}
    </>
  )
}
