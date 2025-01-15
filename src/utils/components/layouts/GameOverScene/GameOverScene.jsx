import React from 'react'
import { useNavigate } from 'react-router-dom'
import MenuOptions from '../MenuOptions'

export default function GameOverScene({ mainMenu, reloadLevel }) {
  const navigate = useNavigate()
  const menuRoute = mainMenu ? reloadLevel : '/'
  const reloadRoute = reloadLevel || '/level1'

  const options = [
    { label: 'Jugar de nuevo', action: () => navigate(0) },
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
