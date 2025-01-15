import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameOverScene({ mainMenu, reloadLevel }) {
  const navigate = useNavigate()
  const menuRoute = mainMenu ? reloadLevel : '/'
  const reloadRoute = reloadLevel || '/level1'

  const [selectedOption, setSelectedOption] = useState(0)

  const options = [
    { label: 'Menú Principal', action: () => navigate(menuRoute) },
    { label: 'Jugar de nuevo', action: () => navigate(0) }
  ]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        setSelectedOption((prev) => (prev + 1) % options.length)
      }
      if (event.key === 'ArrowUp') {
        setSelectedOption(
          (prev) => (prev - 1 + options.length) % options.length
        )
      }
      if (event.key === 'Enter') {
        options[selectedOption].action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedOption, options])

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white select-none'>
      <div className='text-center space-y-8 px-6 py-12 bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl shadow-xl max-w-lg mx-auto'>
        <h1 className='text-6xl font-extrabold text-red-600 drop-shadow-md'>
          Game Over
        </h1>
        <h2 className='text-3xl font-medium'>¿Jugar de nuevo?</h2>

        <div className='space-y-4'>
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-3 text-2xl font-semibold text-white rounded-lg shadow-md transition duration-200 transform hover:scale-105 
                ${
                  selectedOption === index
                    ? 'bg-blue-700 border-2 border-white'
                    : 'bg-slate-600 border-2 border-slate-900'
                } 
                hover:bg-green-500`}
              onClick={option.action}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
