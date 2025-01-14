import React, { useEffect } from 'react'
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

export default function CollectablesGenerator({ collectablesData, level }) {
  useEffect(() => {
    print_debug(`Generating collectables`)
  }, [])

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
      {collectablesData.map((collectable, index) => {
        const CollectableComponent = collectableComponents[collectable.type]
        const soundEffect = generateSoundEffect(collectable)

        if (!CollectableComponent) {
          print_debug(
            `Unknown collectable type: ${collectable.type} at position ${collectable.position}`
          )
          return null
        }

        return (
          <Collectable
            key={index}
            id={index}
            level={level}
            soundEffect={soundEffect}
          >
            <CollectableComponent position={collectable.position} />
          </Collectable>
        )
      })}
    </>
  )
}
