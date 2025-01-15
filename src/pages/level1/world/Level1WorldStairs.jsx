import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Level1WorldStairs(props) {
  const { nodes, materials } = useGLTF(
    'assets/models/world/Level1WorldStairs.glb'
  )
  return (
    <RigidBody type='fixed' colliders='trimesh' position={[0, -1, 0]}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stairs.geometry}
          material={materials.Piedra}
        />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('assets/models/world/Level1WorldStairs.glb')
