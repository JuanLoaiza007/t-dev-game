import React, { useEffect } from 'react'
import { useSavingState } from '../states/SavingState'

const SaveIndicator = () => {
  const savingState = useSavingState()

  useEffect(() => {
    if (savingState.isSaving) {
      const timer = setTimeout(() => {
        savingState.deactiveSaving()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [savingState])

  const blinkStyle = {
    animation: 'blink 1s infinite'
  }

  const blinkKeyframes = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `

  return (
    <>
      <style>{blinkKeyframes}</style>
      <div className='absolute bottom-5 left-5 p-2 flex flex-col items-center justify-center text-center rounded-md select-none'>
        {savingState.isSaving && (
          <>
            <img
              className='w-12 h-12'
              style={blinkStyle}
              src='/assets/images/icons/pata.png'
              alt='loading'
            />
            <p
              className='text-2xl text-white font-sans p-1 rounded-md'
              style={blinkStyle}
            >
              Guardando...
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default SaveIndicator
