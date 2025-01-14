import React, { useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useAudio } from '../../context/AudioContext'
import { useCollectablesState } from '../../utils/components/controller/CharacterCollectables'

const debug = false
const disableCollect4Debug = false

function print_debug(text) {
  if (debug) {
    console.log(`[Collectable]: ${text}`)
  }
}

export default function Collectable({
  children,
  onUpdateState,
  soundEffect = 'collected',
  colliderName = 'character-capsule-collider'
}) {
  const { playSoundEffect } = useAudio()
  const [isTaken, setIsTaken] = useState(false)
  const collectableCountState = useCollectablesState()

  const handleIntersectionEnter = (event) => {
    print_debug(`Colisioné con: ${event.colliderObject.name}`)
    if (event.colliderObject.name === colliderName) {
      playSoundEffect(soundEffect)
      setIsTaken(true)
      collectableCountState.increment()
      onUpdateState?.({ isTaken: true })
    }
  }

  useEffect(() => {
    if (debug && isTaken) {
      console.log(`[Collectable]: Coleccionable tomado`)
    }
  }, [isTaken])

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
