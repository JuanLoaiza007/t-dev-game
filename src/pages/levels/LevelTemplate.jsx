import { Perf } from 'r3f-perf'
import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useLifeState } from '../../utils/components/controller/CharacterLife'
import { useCharacterPositionState } from '../../utils/components/controller/CharacterPositionState'
import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage
} from '../../utils/localStorageUtils'
import useMovements from '../../utils/key-movements'
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import Instructive from '../../utils/components/layouts/instructive/Instructive'
import Controls from '../../utils/controls/Controls'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import { usePlayer } from '../../context/PlayerContext'
import { isPositionInCheckpoints } from '../../utils/controls/position'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'

const debug = process.env.REACT_APP_DEBUG !== 'production'

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
  const positionState = useCharacterPositionState()
  const { player, setPlayer } = usePlayer()

  const [displayLife, setDisplayLife] = useState(true)
  const [actualPosition, setActualPosition] = useState(
    positionState.initialPosition
  )

  useEffect(() => {
    const savedPosition = obtenerDeLocalStorage('actualPosition')
    const isValidPosition =
      savedPosition && isPositionInCheckpoints(savedPosition, checkpointsData)
    const initialPosition = isValidPosition
      ? savedPosition
      : positionState.initialPosition
    if (isValidPosition) {
      console.log("We will use broswer's position")
    } else {
      console.log(
        'We will use default position, is not valid browser: ',
        savedPosition
      )
    }
    setActualPosition(initialPosition)
    guardarEnLocalStorage('actualPosition', initialPosition)
  }, [positionState.initialPosition])

  useEffect(() => {
    setDisplayLife(lifeState.value > 0)
  }, [lifeState.value])

  useEffect(() => {
    if (player.currentLevel !== level) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: level,
        diamondsCollected: 0,
        currentPosition: actualPosition
      }))
    }
    guardarEnLocalStorage('player', player)
  }, [player.currentLevel, lifeState.value, actualPosition, setPlayer])

  const renderAvatar = () => (
    <Ecctrl
      camInitDis={-2}
      camMaxDis={-2}
      maxVelLimit={5}
      jumpVel={4}
      position={actualPosition}
    >
      <Avatar />
    </Ecctrl>
  )

  return (
    <KeyboardControls map={map}>
      <Canvas shadows>
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
