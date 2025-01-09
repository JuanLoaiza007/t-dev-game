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
import GameUI from '../../utils/components/layouts/GameUI/GameUI'
import GameOverScene from '../../utils/components/layouts/GameOverScene/GameOverScene'
import NextLevelButton from '../../utils/components/layouts/GameUI/components/NextLevelButton'
import { usePlayer } from '../../context/PlayerContext'
import Ecctrl from 'ecctrl'
import Avatar from '../../utils/avatar/Avatar'
import Texts from './abstractions/Texts'
import { Model } from './world/Level4World'
import { Cubos } from '../../globals/collectables/Cubos'
import { ObstaculoBarra } from '../../globals/collectables/ObstaculoBarra'
import Rat from '../../globals/villains/Rat'
import { Button_Circle } from '../../globals/collectables/Button'
import Collectables from './collectables/Collectables'
import Instructive from '../../utils/components/layouts/instructive/Instructive'
import Controls from '../../utils/controls/Controls'

const debug = process.env.REACT_APP_DEBUG === 'true'

export default function Level4 () {
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
    const initialPosition = savedPosition || positionState.initialPosition
    setActualPosition(initialPosition)
    guardarEnLocalStorage('actualPosition', initialPosition)
  }, [positionState.initialPosition])

  useEffect(() => {
    setDisplayLife(lifeState.value > 0)
  }, [lifeState.value])

  useEffect(() => {
    if (player.currentLevel !== 4) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        lives: lifeState.value,
        currentLevel: 4,
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
      maxVelLimit={6}
      jumpVel={6}
      position={actualPosition}
    >
      <Avatar />
    </Ecctrl>
  )

  const renderPhysicsWorld = () => (
    <Physics debug={debug}>
      <Model />
      <Cubos position={[0, 100, 61]} />
      <Cubos position={[0, 120, 60]} />
      <ObstaculoBarra position={[0, 35, 90]} />
      <ObstaculoBarra position={[0, 35, 130]} />
      <Rat position={[0, 35, 160]} />
      <Button_Circle position={[0, 34, 280]} ruta='/profile' />
      <Collectables />
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
            <Texts position={[0, 7, 12]} />
          </Suspense>
          <Controls />
        </Canvas>
        {!displayLife && <GameOverScene reloadLevel='/level4' />}
        <GameUI />
        {debug && <NextLevelButton to='/profile' />}
      </KeyboardControls>
    </>
  )
}
