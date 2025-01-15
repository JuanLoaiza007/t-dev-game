import { AvatarProvider } from './context/AvatarContext'
import RoutesTDevGame from './routes/RoutesTDevGame'
import { AudioProvider } from './context/AudioContext'
import { PlayerProvider } from './context/PlayerContext'

const Experience = () => {
  return (
    <AudioProvider>
      <AvatarProvider>
        <PlayerProvider>
          <RoutesTDevGame />
        </PlayerProvider>
      </AvatarProvider>
    </AudioProvider>
  )
}

export default Experience
