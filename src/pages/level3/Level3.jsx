import LevelTemplate from '../levels/LevelTemplate'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level3World from './world/Level3World'
import Texts from './abstractions/Texts'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import collectablesData from './collectables/CollectablesData'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import checkpointsData from './checkpoints/CheckpointsData.json'

export default function Level3() {
  return (
    <LevelTemplate
      level={3}
      initialPosition={[0, 0, 0]}
      checkpointsData={checkpointsData}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level3World />
          <PortalNextWorld position={[10, 0, -200]} nextLevel='/level4' />
          <Collectables collectablesData={collectablesData} />
        </>
      }
      texts={<Texts />}
      nextLevelRoute='/level4'
      reloadLevelRoute='/level3'
    />
  )
}
