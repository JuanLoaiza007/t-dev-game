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
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level3World from './world/Level3World'
import Texts from './abstractions/Texts'
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import NextLevelButton from '../../utils/components/layouts/GameUI/components/NextLevelButton'
import { usePlayer } from '../../context/PlayerContext'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import collectablesData from './collectables/CollectablesData.json'
import checkpointsData from './checkpoints/CheckpointsData.json'
import Instructive from '../../utils/components/layouts/instructive/Instructive'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import Controls from '../../utils/controls/Controls'
import { isPositionInCheckpoints } from '../../utils/controls/position'

const debug = process.env.REACT_APP_DEBUG === 'true'

export default function Level3 () {
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
    setActualPosition(initialPosition)
    guardarEnLocalStorage('actualPosition', initialPosition)
  }, [positionState.initialPosition])

  useEffect(() => {
    setDisplayLife(lifeState.value > 0)
  }, [lifeState.value])

  useEffect(() => {
    if (player.currentLevel !== 3) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: 3,
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

  const renderPhysicsWorld = () => (
    <Physics debug={debug}>
      <Level3World />
      <Checkpoints checkpointsData={checkpointsData} />
      <Collectables collectablesData={collectablesData} />
      {displayLife && renderAvatar()}
    </Physics>
  )

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows>
          {debug && <Perf position='top-left' />}
          <Suspense fallback={<Instructive />}>
            <Lights />
            <Environments />
            {renderPhysicsWorld()}
            <Texts />
          </Suspense>
          <Controls />
        </Canvas>
        {!displayLife && <GameOverScene reloadLevel='/level3' />}
        <GameUI />
        {debug && <NextLevelButton to='/level4' />}
      </KeyboardControls>
    </>
  )
}
