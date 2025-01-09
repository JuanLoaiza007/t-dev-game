import LevelTemplate from '../levels/LevelTemplate'
import Texts from '../level2/abstractions/Texts'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level2World from './world/Level2World'
import Checkpoints from '../../globals/interactables/CheckpointsGenerator'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import SymbolicSensors from './world/SymbolicSensors'
import ManualColliders from './world/ManualColliders'
import Villains from '../../globals/villains/VillainsGenerator'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import collectablesData from './collectables/CollectablesData.json'
import checkpointsData from './checkpoints/CheckpointsData.json'
import VillainsData from './villains/VillainsData.json'

export default function Level2() {
  return (
    <LevelTemplate
      level={2}
      initialPosition={[0, 0, 0]}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level2World />
          <Checkpoints checkpointsData={checkpointsData} />
          <Collectables collectablesData={collectablesData} />
          <SymbolicSensors />
          <ManualColliders />
          <Villains villainsData={VillainsData} />
          <PortalNextWorld position={[-24, 20, -102]} nextLevel='/level3' />
        </>
      }
      texts={<Texts />}
      nextLevelRoute='/level3'
      reloadLevelRoute='/level2'
    />
  )
}
