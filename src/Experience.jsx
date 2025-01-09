import { AvatarProvider } from './context/AvatarContext'
import RoutesTDevGame from './routes/RoutesTDevGame'
import { AudioProvider } from './context/AudioContext'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'

const Experience = () => {
  return (
    <AuthProvider>
      <AudioProvider>
        <AvatarProvider>
          <PlayerProvider>
            <RoutesTDevGame />
          </PlayerProvider>
        </AvatarProvider>
      </AudioProvider>
    </AuthProvider>
  )
}

export default Experience
