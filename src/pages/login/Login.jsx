import { APP_NAME, APP_VERSION } from '../../_config/ConstantsApp'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePlayer } from '../../context/PlayerContext'

export default function Login() {
  const navigate = useNavigate()
  const { player, resetPlayerData } = usePlayer()
  const levelToNavigate = `/${player?.currentLevel || 1}`

  // Opciones del menú
  const menuOptions = [
    { label: 'Iniciar', action: () => navigate(levelToNavigate) },
    { label: 'Eliminar mi progreso', action: () => resetPlayerData() }
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)

  // Manejo de teclas
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      setSelectedIndex((prev) =>
        prev === 0 ? menuOptions.length - 1 : prev - 1
      )
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        prev === menuOptions.length - 1 ? 0 : prev + 1
      )
    } else if (event.key === 'Enter') {
      menuOptions[selectedIndex].action()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  return (
    <div className='flex flex-col w-full h-full justify-center items-center bg-gradient-to-r from-green-900 to-purple-700 select-none p-4'>
      <div className='flex flex-col justify-center items-center bg-black bg-opacity-60 p-10 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 gap-4'>
        <img
          className='w-20 h-20 md:w-40 md:h-40 fit-contain'
          src='/assets/images/t-dev/t-dev-logo-with-text.png'
          alt='Logo T-Dev con texto T-Dev'
        />
        <h2 className='text-3xl font-bold text-white tracking-wide text-center'>
          {APP_NAME}
        </h2>

        {/* Opciones de menú */}
        <div className='flex flex-col gap-3'>
          {menuOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              onMouseEnter={() => setSelectedIndex(index)} // Resaltar con mouse
              className={`px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-lg ${
                selectedIndex === index
                  ? 'bg-green-900'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className='fixed right-0 bottom-0 p-2 text-black bg-white rounded-lg text-sm font-bold m-4'>
        <p>{APP_VERSION}</p>
      </div>
    </div>
  )
}
