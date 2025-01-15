import React from 'react'
import { CuboidCollider } from '@react-three/rapier'
import { useAudio } from '../../context/AudioContext'
import { useSavingState } from '../../utils/components/layouts/GameUI/states/SavingState'
import { usePlayer } from '../../context/PlayerContext'

const debug = true

function print_debug(text) {
  if (debug) {
    console.log(`[Checkpoint.jsx]: ${text}`)
  }
}

export default function Checkpoint(props) {
  const { handlePlayMusic, playSoundEffect } = useAudio()
  const savingState = useSavingState()
  const { updatePlayerPosition } = usePlayer()

  const handleCheckpoint = (event) => {
    if (event.colliderObject.name === 'character-capsule-collider') {
      updatePlayerPosition(props.position)
      print_debug(`${props.name} reached`)
    }
  }

  return (
    <CuboidCollider
      {...props}
      onIntersectionEnter={(event) => {
        savingState.activeSaving()
        handleCheckpoint(event)
      }}
      sensor
    />
  )
}
