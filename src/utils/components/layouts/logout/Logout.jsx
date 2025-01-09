import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './stylesLogout.css'

export default function Logout () {
  const auth = useAuth()
  const navigate = useNavigate()

  const onHandleButtonLogout = async () => {
    await auth.logout()
      .then((res) => {
        navigate('/')
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='button-logout'>
      <button onClick={onHandleButtonLogout}>
        Cerrar sesión
      </button>
    </div>
  )
}
