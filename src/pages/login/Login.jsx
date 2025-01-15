import { APP_NAME, APP_VERSION } from '../../_config/ConstantsApp'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-full h-full justify-center items-center bg-gradient-to-r from-green-900 to-purple-700 select-none'>
      <div className='flex flex-col justify-center items-center bg-black bg-opacity-60 p-10 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 gap-4'>
        <img
          className='w-40'
          src='/assets/images/t-dev/t-dev-logo-with-text.png'
          alt='Logo T-Dev con texto T-Dev'
        />
        <h2 className='text-3xl font-bold text-white tracking-wide text-center'>
          {APP_NAME}
        </h2>
        <button
          onClick={() => navigate('/level1')}
          className='px-8 py-3 text-white bg-green-700 font-semibold rounded-lg hover:bg-green-900 transition-all duration-3 300 ease-in-out shadow-lg'
        >
          Iniciar
        </button>
      </div>
      <div className='fixed right-0 bottom-0 p-2 text-black bg-white rounded-lg text-sm font-bold m-4'>
        <p>{APP_VERSION}</p>
      </div>
    </div>
  )
}
