import React from 'react'
import { Sparkles, useGLTF } from '@react-three/drei'

export default function DiamondCone(props) {
  const { nodes, materials } = useGLTF(
    '/assets/models/collectables/DiamondCone.glb'
  )

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cone.geometry} material={materials.hept32palette} />
      <Sparkles
        position={[0, 0.5, 0]}
        count={10}
        speed={1}
        color='yellow'
        size={6}
        scale={0.8}
      />
    </group>
  )
}

useGLTF.preload('/assets/models/collectables/DiamondCone.glb')
