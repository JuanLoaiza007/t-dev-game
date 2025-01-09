import { createContext, useContext, useState, useEffect } from 'react'
import { useLifeState } from '../utils/components/controller/CharacterLife'
import { useCollectablesState } from '../utils/components/controller/CharacterCollectables'

export const playerContext = createContext()

export const usePlayer = () => {
  const context = useContext(playerContext)
  if (!context) {
    console.error('Error: usePlayer debe ser usado dentro de un PlayerProvider')
    return
  }
  return context
}

export function PlayerProvider ({ children }) {
  const { value: life } = useLifeState()
  const { value: diamonds } = useCollectablesState()
  const [player, setPlayer] = useState({
    name: 'Jugador1',
    lives: life,
    currentLevel: 1,
    currentPosition: [0, 0, 0],
    diamondsCollected: diamonds
  })

  useEffect(() => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: life
    }))
  }, [life])

  useEffect(() => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      diamondsCollected: diamonds
    }))
  }, [diamonds])

  return (
    <playerContext.Provider value={{ player, setPlayer }}>
      {children}
    </playerContext.Provider>
  )
}
