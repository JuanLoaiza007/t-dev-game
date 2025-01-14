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
          collectablesState: {} // Store collectable states by level
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
