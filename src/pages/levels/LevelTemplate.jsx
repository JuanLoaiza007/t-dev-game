import { Perf } from 'r3f-perf'
import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useLifeState } from '../../utils/components/controller/CharacterLife'
import useMovements from '../../utils/key-movements'
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import Instructive from '../../utils/components/layouts/instructive/Instructive'
import Controls from '../../utils/controls/Controls'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import { usePlayer } from '../../context/PlayerContext'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'

const debug = process.env.REACT_APP_ENVIRONMENT !== 'production'

export default function LevelTemplate({
  level,
  initialPosition,
  checkpointsData,
  lights,
  environments,
  physicsWorld,
  texts,
  nextLevelRoute,
  reloadLevelRoute
}) {
  const map = useMovements()
  const lifeState = useLifeState()
  const { player, setPlayer } = usePlayer()

  const [displayLife, setDisplayLife] = useState(true)

  const canvasRef = useRef(null)

  useEffect(() => {
    if (player.currentLevel !== level) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: level,
        currentPosition: [0, 2, 0]
      }))
    }
  }, [player.currentLevel, level])

  useEffect(() => {
    setDisplayLife(lifeState.value > 0)
  }, [lifeState.value])

  useEffect(() => {
    const handlePointerLock = (event) => {
      if (
        canvasRef.current &&
        document.pointerLockElement !== canvasRef.current
      ) {
        canvasRef.current.requestPointerLock()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        document.exitPointerLock()
      }
    }

    if (canvasRef.current) {
      canvasRef.current.addEventListener('click', handlePointerLock)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handlePointerLock)
      }
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const renderAvatar = () => (
    <Ecctrl
      camInitDis={-2}
      camMaxDis={-2}
      maxVelLimit={5}
      jumpVel={4}
      position={player.currentPosition}
    >
      <Avatar />
    </Ecctrl>
  )

  return (
    <KeyboardControls map={map}>
      <Canvas ref={canvasRef} shadows>
        {debug && <Perf position='top-left' />}
        <Suspense fallback={<Instructive />}>
          {lights}
          {environments}
          <Physics debug={debug}>
            {physicsWorld}
            {checkpointsData && (
              <Checkpoints checkpointsData={checkpointsData} />
            )}
            {displayLife && renderAvatar()}
          </Physics>
          {texts}
        </Suspense>
        <Controls />
      </Canvas>
      {!displayLife && <GameOverScene reloadLevel={reloadLevelRoute} />}
      <GameUI />
    </KeyboardControls>
  )
}
