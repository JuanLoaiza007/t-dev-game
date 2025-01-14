import React, { useEffect, useState } from 'react'
import './CornerTopRight.css'
import { usePlayer } from '../../../../../context/PlayerContext'

const CornerTopRight = () => {
  const { player } = usePlayer()
  const [vida, setVida] = useState('')

  useEffect(() => {
    const updatedVida = Array(player.lives).fill('❤️').join('')
    setVida(updatedVida)
  }, [player.lives])

  return (
    <div className='container-top-right'>
      <div className='life-label'>{vida}</div>
      <div
        className='life-bar'
        style={{ width: `${(player.lives / 3) * 100}%` }}
      />
      <div className='diamond-count'>
        💎 x {player.currentLevelCollectables}
      </div>
    </div>
  )
}

export default CornerTopRight
