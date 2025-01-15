import React, { useState } from 'react'
import { useGLTF, Sparkles } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useCharacterInteraction } from '../../utils/components/controller/CharacterInteractionState'

const debug = false

function print_debug(text) {
  if (debug) {
    console.log(`[Button.jsx]: ${text}`)
  }
}

export default function Button(props) {
  const characterInteractionState = useCharacterInteraction()
  const { nodes, materials } = useGLTF('/assets/models/objects/button.glb')
  const [canInteract, setCanInteract] = useState(false)

  const handleIntersectionEnter = (event) => {
    print_debug(`Colisioné con: ${event.colliderObject.name}`)

    if (event.colliderObject.name === 'character-capsule-collider') {
      setCanInteract(true)
      characterInteractionState.assign(() => {
        if (!props.interactFunction) {
          print_debug('No me has asignado props.interactionFunction!!!')
        } else {
          props.interactFunction()
        }
      })
    }
  }

  const handleIntersectionExit = (event) => {
    print_debug(`Salí de colision con: ${event.colliderObject.name}`)

    if (event.colliderObject.name === 'character-capsule-collider') {
      setCanInteract(false)
      characterInteractionState.clear()
    }
  }

  return (
    <RigidBody type='fixed' colliders={false}>
      <group {...props} name='Scene'>
        <group name='Button' scale={0.7}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.Cuerpo}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials.Botón}
          />
        </group>
        <CuboidCollider position={[0, 0.6, 0]} args={[0.25, 1, 0.25]} />

        {/* Sensor para interactuar */}
        <CuboidCollider
          position={[0, 0.6, 0]}
          args={[1, 1, 1]}
          onIntersectionEnter={(event) => handleIntersectionEnter(event)}
          onIntersectionExit={(event) => handleIntersectionExit(event)}
          sensor
        />
        {/* Retroalimentacion de interactuar */}
        {canInteract && (
          <Sparkles
            position={[0, 1, 0]}
            count={10}
            speed={1}
            color='blue'
            size={6}
            scale={2}
          />
        )}
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/objects/button.glb')
