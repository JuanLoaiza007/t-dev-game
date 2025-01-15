import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../../../../context/PlayerContext'

const CornerTopRight = () => {
  const { player } = usePlayer()
  const [vida, setVida] = useState('')

  useEffect(() => {
    const updatedVida = Array(player.lives).fill('❤️').join('')
    setVida(updatedVida)
  }, [player.lives])

  return (
    <div className='absolute top-5 right-5 p-2 text-right select-none'>
      <div className='text-2xl text-shadow-black'>{vida}</div>
      <div className='text-xl font-bold text-white text-shadow-black'>
        💎 x {player.currentLevelCollectables}
      </div>
    </div>
  )
}

export default CornerTopRight
