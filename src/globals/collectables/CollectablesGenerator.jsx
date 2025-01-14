import React, { useState, useEffect } from 'react'
import Collectable from './Collectable'
import DiamondCone from './DiamondCone'

const debug = true

function print_debug(text) {
  if (debug) {
    console.log(`[CollectablesGenerator.jsx]: ${text}`)
  }
}

// Map each type to its respective component
const collectableComponents = {
  diamondCone: DiamondCone
}

export default function Collectables({ collectablesData }) {
  const [collectables, setCollectables] = useState([])

  // Generate collectables with auto-assigned IDs
  useEffect(() => {
    const initializedCollectables = collectablesData.map(
      (collectable, index) => ({
        id: index,
        ...collectable
      })
    )
    setCollectables(initializedCollectables)
  }, [collectablesData])

  // Debug changes in collectables
  useEffect(() => {
    print_debug(`Collectables state updated: ${JSON.stringify(collectables)}`)
  }, [collectables])

  // Update a specific collectable's state
  const updateCollectableState = (id, newState) => {
    setCollectables((prevCollectables) =>
      prevCollectables.map((collectable) =>
        collectable.id === id ? { ...collectable, ...newState } : collectable
      )
    )
  }

  const generateSoundEffect = (collectable) => {
    switch (collectable.type) {
      case 'diamondCone':
        return 'diamondCollect'
      default:
        return 'collected'
    }
  }

  return (
    <>
      {collectables.map((collectable) => {
        const CollectableComponent = collectableComponents[collectable.type]
        const soundEffect = generateSoundEffect(collectable)
        if (!CollectableComponent) {
          print_debug(`Unknown collectable type: ${collectable.type}`)
          return null
        }

        return (
          <Collectable
            key={collectable.id}
            soundEffect={soundEffect}
            onUpdateState={(newState) =>
              updateCollectableState(collectable.id, newState)
            }
          >
            <CollectableComponent position={collectable.position} />
          </Collectable>
        )
      })}
    </>
  )
}
