import React, { useState, useEffect } from 'react'

export default function MenuOptions({ title, subtitle, options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(0)

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
        onSelect(selectedOption)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedOption, options, onSelect])

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white select-none'>
      <div className='text-center space-y-8 px-6 py-12 bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl shadow-xl max-w-lg mx-auto'>
        {title && (
          <h1 className='text-6xl font-extrabold text-red-600 drop-shadow-md'>
            {title}
          </h1>
        )}
        {subtitle && <h2 className='text-3xl font-medium'>{subtitle}</h2>}
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
              onClick={() => onSelect(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
