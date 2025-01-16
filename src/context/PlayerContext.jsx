import { createContext, useContext, useState, useEffect } from 'react'
import { useLifeState } from '../utils/components/controller/CharacterLife'

export const playerContext = createContext()

export const usePlayer = () => {
  const context = useContext(playerContext)
  if (!context) {
    console.error('Error: usePlayer must be used within a PlayerProvider')
    return
  }
  return context
}

export function PlayerProvider({ children }) {
  const { value: life, reset } = useLifeState()

  const basePlayer = {
    name: 'Jugador1',
    lives: life,
    currentLevel: 'level_1',
    currentPosition: [0, 2, 0],
    collectablesState: {},
    currentLevelCollectables: 0,
    totalCollectables: 0
  }

  const [player, setPlayer] = useState(() => {
    const storedPlayer = localStorage.getItem('playerData')
    return storedPlayer ? JSON.parse(storedPlayer) : basePlayer
  })

  useEffect(() => {
    localStorage.setItem('playerData', JSON.stringify(player))
  }, [player])

  useEffect(() => {
    setPlayer((prev) => ({ ...prev, lives: life }))
  }, [life])

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

  const updatePlayerPosition = (position) => {
    setPlayer((prev) => ({ ...prev, currentPosition: position }))
  }

  const resetPlayerData = async () => {
    reset()
    setPlayer(basePlayer)
  }

  const restartLevel = () => {
    reset()
    setPlayer((prev) => ({
      ...prev
    }))
  }

  return (
    <playerContext.Provider
      value={{
        player,
        setPlayer,
        updateCollectableState,
        updatePlayerPosition,
        resetPlayerData,
        restartLevel
      }}
    >
      {children}
    </playerContext.Provider>
  )
}
