import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Level1 from '../pages/level1/Level1'
import Level2 from '../pages/level2/Level2'
import Level3 from '../pages/level3/Level3'
import Level4 from '../pages/level4/Level4'
import Profile from '../pages/profile/Profile'
import { useAudio } from '../context/AudioContext'
import { useEffect } from 'react'

export default function RoutesTDevGame() {
  const { mute } = useAudio()

  useEffect(() => {
    mute() // Mute the audio when the app loads
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/level1' element={<Level1 />} />
        <Route path='/level2' element={<Level2 />} />
        <Route path='/level3' element={<Level3 />} />
        <Route path='/level4' element={<Level4 />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
