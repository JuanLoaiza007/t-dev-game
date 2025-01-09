import React, { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useAudio } from '../../../context/AudioContext'
import { useLifeState } from '../../../utils/components/controller/CharacterLife'
import { TorusGeometry } from 'three/src/Three.js'

const debug = false
function print_debug (text) {
  if (debug) {
    console.log(`[SymbolicSensors.jsx]: ${text}`)
  }
}

export default function SymbolicSensors ({ ...props }) {
  const { handlePlayMusic } = useAudio()
  const { playSoundEffect } = useAudio()
  const lifeState = useLifeState()
  const torusGeometry = new TorusGeometry()

  const handleIntersectionEnter = (event, themeName, soundEffect = 'none') => {
    console.log('[ZoneSensors.jsx] colisioné con: ', event.colliderObject.name)
    if (event.colliderObject.name == 'character-capsule-collider') {
      console.log(
        `[ZoneSensors.jsx] Toca reproducir ${themeName} ${soundEffect}`
      )

      if (themeName != 'continue') {
        handlePlayMusic(themeName)
      }

      if (soundEffect != 'none') {
        playSoundEffect(soundEffect)
      }
    }
  }

  const gainLive = (lifeState) => {
    lifeState.increment()
  }

  const loseLive = (lifeState) => {
    lifeState.decrement()
    print_debug(`LifeState.value is: ${lifeState.value}`)
  }

  return (
    <group {...props} dispose={null}>
      <RigidBody type='fixed' colliders={false} />
    </group>
  )
}
