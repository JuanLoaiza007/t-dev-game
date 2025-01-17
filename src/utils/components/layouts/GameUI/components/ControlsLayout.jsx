import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../../../../_config/assets.json'
import { ReactSVG } from 'react-svg'

export default function ControlsLayout() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'm' || event.key === 'M') {
      navigate('/')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='absolute left-0 top-1/3 px-4 select-none'>
      <div className='flex flex-row justify-center items-center gap-4'>
        <p className='text-white text-xl font-bold'>M</p>
        <button onClick={handleClick}>
          <ReactSVG
            className='text-white'
            style={{ transform: 'scale(2.0)' }}
            src={assets.ui.exit}
          />
        </button>
      </div>
    </div>
  )
}
