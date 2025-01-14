import React, { useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useAudio } from '../../context/AudioContext'
import { usePlayer } from '../../context/PlayerContext'

const debug = false
const disableCollect4Debug = false

function print_debug(text) {
  if (debug) {
    console.log(`[Collectable]: ${text}`)
  }
}

export default function Collectable({
  id,
  level,
  children,
  soundEffect = 'collected',
  collidableObjects = ['character-capsule-collider']
}) {
  const { playSoundEffect } = useAudio()
  const { player, updateCollectableState } = usePlayer()
  const [isTaken, setIsTaken] = useState(
    player.collectablesState[level]?.[id] || false
  )

  const handleIntersectionEnter = (event) => {
    print_debug(`Colisioné con: ${event.colliderObject.name}`)
    if (collidableObjects.includes(event.colliderObject.name)) {
      playSoundEffect(soundEffect)
      setIsTaken(true)
      updateCollectableState(level, id, true)
    }
  }

  return (
    !isTaken && (
      <RigidBody
        type='fixed'
        colliders='cuboid'
        sensor
        onIntersectionEnter={(event) => {
          if (!disableCollect4Debug) handleIntersectionEnter(event)
        }}
      >
        {children}
      </RigidBody>
    )
  )
}
