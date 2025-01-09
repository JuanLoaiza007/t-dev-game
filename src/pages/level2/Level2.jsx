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
import Level2World from './world/Level2World'
import Level2WorldZone1 from './world/Level2WorldZone1'
import Level2WorldZone2 from './world/Level2WorldZone2'
import Level2WorldZone3 from './world/Level2WorldZone3'
import Level2WorldZone4 from './world/Level2WorldZone4'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import Controls from '../../utils/controls/Controls'
import { isPositionInCheckpoints } from '../../utils/controls/position'
import Texts from './abstractions/Texts'
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import NextLevelButton from '../../utils/components/layouts/GameUI/components/NextLevelButton'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import SymbolicSensors from './world/SymbolicSensors'
import ManualColliders from './world/ManualColliders'
import Villains from '../../globals/villains/VillainsGenerator'
import { usePlayer } from '../../context/PlayerContext'
import collectablesData from './collectables/CollectablesData.json'
import checkpointsData from './checkpoints/CheckpointsData.json'
import VillainsData from './villains/VillainsData.json'
import Instructive from '../../utils/components/layouts/instructive/Instructive'

const debug = process.env.REACT_APP_DEBUG === 'true'

export default function Level2 () {
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
    if (player.currentLevel !== 2) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: 2,
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
      maxVelLimit={4}
      jumpVel={3}
      position={actualPosition}
      slopeMaxAngle={Math.PI / 5.5}
    >
      <Avatar />
    </Ecctrl>
  )

  const renderPhysicsWorld = () => (
    <Physics debug={debug}>
      <Level2World />
      <Level2WorldZone1 />
      <Level2WorldZone2 />
      <Level2WorldZone3 />
      <Level2WorldZone4 />
      <Checkpoints checkpointsData={checkpointsData} />
      <Collectables collectablesData={collectablesData} />
      <SymbolicSensors />
      <ManualColliders />
      <Villains villainsData={VillainsData} />
      {displayLife && renderAvatar()}
      <PortalNextWorld position={[-24, 20, -102]} nextLevel='/level3' />
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
        {!displayLife && <GameOverScene reloadLevel='/level2' />}
        <GameUI />
        {debug && <NextLevelButton to='/level3' />}
      </KeyboardControls>
    </>
  )
}
