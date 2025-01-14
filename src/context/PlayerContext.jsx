import { createContext, useContext, useState, useEffect } from 'react'
import { useLifeState } from '../utils/components/controller/CharacterLife'

export const playerContext = createContext()

export const usePlayer = () => {
  const context = useContext(playerContext)
  if (!context) {
    console.error('Error: usePlayer debe ser usado dentro de un PlayerProvider')
    return
  }
  return context
}

export function PlayerProvider({ children }) {
  const { value: life } = useLifeState()
  const [player, setPlayer] = useState(() => {
    const storedPlayer = localStorage.getItem('playerData')
    return storedPlayer
      ? JSON.parse(storedPlayer)
      : {
          name: 'Jugador1',
          lives: life,
          currentLevel: 1,
          currentPosition: [0, 0, 0],
          collectablesState: {},
          currentLevelCollectables: 0,
          totalCollectables: 0
        }
  })

  // Sync player data with localStorage
  useEffect(() => {
    localStorage.setItem('playerData', JSON.stringify(player))
  }, [player])

  // Update player lives
  useEffect(() => {
    setPlayer((prev) => ({ ...prev, lives: life }))
  }, [life])

  // Update collectables count for the current level
  useEffect(() => {
    const currentLevel = player.currentLevel
    const collectablesInCurrentLevel =
      player.collectablesState[currentLevel] || {}
    const count = Object.keys(collectablesInCurrentLevel).length

    setPlayer((prev) => ({
      ...prev,
      currentLevelCollectables: count
    }))
  }, [player.collectablesState, player.currentLevel])

  // Update total collectables count
  useEffect(() => {
    const totalCollectables = Object.keys(player.collectablesState).reduce(
      (acc, level) => {
        const levelCollectables = player.collectablesState[level]
        return acc + Object.keys(levelCollectables).length
      },
      0
    )

    setPlayer((prev) => ({ ...prev, totalCollectables }))
  }, [player.collectablesState])

  const updateCollectableState = (level, id, isCollected) => {
    setPlayer((prev) => {
      const updatedCollectablesState = { ...prev.collectablesState }
      if (!updatedCollectablesState[level]) {
        updatedCollectablesState[level] = {}
      }
      updatedCollectablesState[level][id] = isCollected
      return { ...prev, collectablesState: updatedCollectablesState }
    })
  }

  return (
    <playerContext.Provider
      value={{ player, setPlayer, updateCollectableState }}
    >
      {children}
    </playerContext.Provider>
  )
}
