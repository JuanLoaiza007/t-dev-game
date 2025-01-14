import LevelTemplate from '../levels/LevelTemplate'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import { Model as Level4World } from './world/Level4World'
import Texts from './abstractions/Texts'
import collectablesData from './collectables/CollectablesData'
import CollectablesGenerator from '../../globals/collectables/CollectablesGenerator'
import { Cubos } from '../../globals/collectables/Cubos'
import { ObstaculoBarra } from '../../globals/collectables/ObstaculoBarra'
import Rat from '../../globals/villains/Rat'
import { Button_Circle } from '../../globals/collectables/Button'

const levelName = 'level_4'

export default function Level4() {
  return (
    <LevelTemplate
      level={levelName}
      initialPosition={[0, 0, 0]}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level4World />
          <Cubos position={[0, 100, 61]} />
          <Cubos position={[0, 120, 60]} />
          <ObstaculoBarra position={[0, 35, 90]} />
          <ObstaculoBarra position={[0, 35, 130]} />
          <Rat position={[0, 35, 160]} />
          <Button_Circle position={[0, 34, 280]} ruta='/profile' />
          <CollectablesGenerator
            collectablesData={collectablesData}
            level={levelName}
          />
        </>
      }
      texts={<Texts position={[0, 7, 12]} />}
      nextLevelRoute='/profile'
      reloadLevelRoute='/level4'
    />
  )
}
