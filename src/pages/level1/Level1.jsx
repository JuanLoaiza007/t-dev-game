import LevelTemplate from '../levels/LevelTemplate'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level1World from './world/Level1World'
import Texts from './abstractions/Texts'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import CollectablesGenerator from '../../globals/collectables/CollectablesGenerator'
import ZoneSensors from './world/ZoneSensors'
import Button from '../../globals/interactables/Button'
import Rat from '../../globals/villains/Rat'
import collectablesData from './collectables/CollectablesData'
import checkpointsData from './checkpoints/CheckpointsData.json'
import Level1WorldStairs from './world/Level1WorldStairs'
import { useState } from 'react'

const levelName = 'level_1'

export default function Level1() {
  const [stairsActived, setStairsActived] = useState(false)

  return (
    <LevelTemplate
      level={levelName}
      initialPosition={[0, 0, 0]}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level1World />
          <PortalNextWorld position={[0, 0, -224]} nextLevel='/level2' />
          <CollectablesGenerator
            collectablesData={collectablesData}
            level={levelName}
          />
          <ZoneSensors />
          <Button
            position={[0, -0.5, -158]}
            interactFunction={() => {
              setStairsActived(!stairsActived)
            }}
          />
          <Rat position={[0, 0, -135]} />
          {stairsActived && <Level1WorldStairs />}
        </>
      }
      texts={<Texts />}
      checkpointsData={checkpointsData}
      nextLevelRoute='/level2'
      reloadLevelRoute='/level1'
    />
  )
}
