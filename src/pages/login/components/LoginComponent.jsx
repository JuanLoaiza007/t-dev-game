import { useNavigate } from 'react-router-dom'

export default function LoginComponent() {
  const navigate = useNavigate()

  return (
    <>
      <div className='card rounded-4 text-center'>
        <div>
          <img
            className='logo-image my-4'
            src='/assets/images/t-dev/t-dev-logo-with-text.png'
            alt='Logo T-Dev con texto T-Dev'
          />
        </div>

        <h2 className='text-primary'>La puerta a la dimension desconocida</h2>

        <div className='flex justify-center'>
          <button
            className='btn btn-outline-primary rounded-4 mt-4 mb-2'
            onClick={() => navigate('/level1')}
          >
            Iniciar
          </button>
        </div>
      </div>
    </>
  )
}
