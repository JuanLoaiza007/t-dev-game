import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../../../../context/PlayerContext'
import MenuOptions from '../MenuOptions'

export default function GameOverScene({ mainMenu }) {
  const navigate = useNavigate()
  const { restartLevel } = usePlayer()
  const menuRoute = '/'

  const options = [
    {
      label: 'Jugar de nuevo',
      action: () => {
        restartLevel()
      }
    },
    { label: 'Menú Principal', action: () => navigate(menuRoute) }
  ]

  const handleSelect = (index) => {
    options[index].action()
  }

  return (
    <MenuOptions
      title='Game Over'
      subtitle='¿Jugar de nuevo?'
      options={options}
      onSelect={handleSelect}
    />
  )
}
