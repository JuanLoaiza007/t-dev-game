import LevelTemplate from '../levels/LevelTemplate'
import Lights from './lights/Lights'
import Environments from './staging/Environments'
import Level1World from './world/Level1World'
import Texts from './abstractions/Texts'
import PortalNextWorld from '../../globals/interactables/PortalNextWorld'
import Collectables from '../../globals/collectables/CollectablesGenerator'
import SymbolicSensors from './world/SymbolicSensors'
import ZoneSensors from './world/ZoneSensors'
import Button from '../../globals/interactables/Button'
import Rat from '../../globals/villains/Rat'
import collectablesData from './collectables/CollectablesData.json'
import checkpointsData from './checkpoints/CheckpointsData.json'

export default function Level1() {
  return (
    <LevelTemplate
      level={1}
      initialPosition={[0, 0, 0]}
      lights={<Lights />}
      environments={<Environments />}
      physicsWorld={
        <>
          <Level1World />
          <PortalNextWorld position={[0, 0, -224]} nextLevel='/level2' />
          <Collectables collectablesData={collectablesData} />
          <SymbolicSensors />
          <ZoneSensors />
          <Button position={[0, -0.5, -158]} />
          <Rat position={[0, 0, -135]} />
        </>
      }
      texts={<Texts />}
      checkpointsData={checkpointsData}
      nextLevelRoute='/level2'
      reloadLevelRoute='/level1'
    />
  )
}
