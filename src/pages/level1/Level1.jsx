import { Perf } from 'r3f-perf'
import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useLifeState } from '../../utils/components/controller/CharacterLife'
import { useCharacterPositionState } from '../../utils/components/controller/CharacterPositionState'
import { isPositionInCheckpoints } from '../../utils/controls/position'
import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage
} from '../../utils/localStorageUtils'
import useMovements from '../../utils/key-movements'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level1World from './world/Level1World'
import Texts from './abstractions/Texts'
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import Logout from '../../utils/components/layouts/logout/Logout'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import SymbolicSensors from './world/SymbolicSensors'
import ZoneSensors from './world/ZoneSensors'
import Button from '../../globals/interactables/Button'
import Rat from '../../globals/villains/Rat'
import Controls from '../../utils/controls/Controls'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import Instructive from '../../utils/components/layouts/instructive/Instructive'
import collectablesData from './collectables/CollectablesData.json'
import checkpointsData from './checkpoints/CheckpointsData.json'
import { usePlayer } from '../../context/PlayerContext'

const debug = process.env.REACT_APP_ENVIRONMENT !== 'production'

export default function Level1 () {
  const map = useMovements()
  const lifeState = useLifeState()
  const positionState = useCharacterPositionState()
  const { player, setPlayer } = usePlayer()

  const [displayLife, setDisplayLife] = useState(true)
  const [actualPosition, setActualPosition] = useState(
    positionState.initialPosition
  )

  useEffect(() => {
    const curPos = obtenerDeLocalStorage('actualPosition')
    const isValidPosition =
      curPos && isPositionInCheckpoints(curPos, checkpointsData)
    const initialPosition = isValidPosition
      ? curPos
      : positionState.initialPosition
    setActualPosition(initialPosition)
    guardarEnLocalStorage('actualPosition', initialPosition)
  }, [positionState.initialPosition])

  useEffect(() => {
    setDisplayLife(lifeState.value > 0)
  }, [lifeState.value])

  useEffect(() => {
    if (player.currentLevel !== 1) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: 1,
        diamondsCollected: 0,
        currentPosition: [0, 0, 0]
      }))
    }
    guardarEnLocalStorage('player', player)
  }, [player.currentLevel, lifeState.value, setPlayer])

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
      <Level1World />
      <PortalNextWorld position={[0, 0, -224]} nextLevel='/level2' />
      <Checkpoints checkpointsData={checkpointsData} />
      <Collectables collectablesData={collectablesData} />
      <SymbolicSensors />
      <ZoneSensors />
      <Button position={[0, -0.5, -158]} />
      <Rat position={[0, 0, -135]} />
      {displayLife && renderAvatar()}
    </Physics>
  )

  return (
    <>
      <KeyboardControls map={map}>
        <Logout />
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
        {!displayLife && <GameOverScene reloadLevel='/level1' />}
        <GameUI />
      </KeyboardControls>
    </>
  )
}
