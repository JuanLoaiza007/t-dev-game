import LevelTemplate from '../levels/LevelTemplate'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level3World from './world/Level3World'
import Texts from './abstractions/Texts'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import collectablesData from './collectables/CollectablesData'
import CollectablesGenerator from '../../globals/collectables/CollectablesGenerator'
import checkpointsData from './checkpoints/CheckpointsData.json'

const levelName = 'level_3'

export default function Level3() {
  return (
    <LevelTemplate
      level={levelName}
      initialPosition={[0, 0, 0]}
      checkpointsData={checkpointsData}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level3World />
          <PortalNextWorld position={[10, 0, -200]} nextLevel='/level_4' />
          <CollectablesGenerator
            collectablesData={collectablesData}
            level={levelName}
          />
        </>
      }
      physicsProps={{
        gravity: [0, -18, 0]
      }}
      texts={<Texts />}
      nextLevelRoute='/level_4'
      reloadLevelRoute='/level_3'
    />
  )
}
