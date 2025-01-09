import React, { useEffect } from 'react'
import { useSavingState } from '../states/SavingState'
import './SaveIndicator.css'

const createSaveIndicator = () => {
  const savingState = useSavingState()

  useEffect(() => {
    if (savingState.isSaving) {
      const timer = setTimeout(() => {
        savingState.deactiveSaving()
      }, 3000)
    }
  }, [savingState])

  return (
    <div className='container-bottom-left'>
      {savingState.isSaving && (
        <>
          <img
            className='save-image'
            src='/assets/images/icons/pata.png'
            alt='loading'
          />
          <p className='save-text'>Guardando...</p>
        </>
      )}
    </div>
  )
}

export default createSaveIndicator
