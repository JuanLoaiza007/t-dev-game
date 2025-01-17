import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Level1 from '../pages/level1/Level1'
import Level2 from '../pages/level2/Level2'
import Level3 from '../pages/level3/Level3'
import Level4 from '../pages/level4/Level4'
import Profile from '../pages/profile/Profile'
import Instructive from '../utils/components/layouts/instructive/Instructive'

export default function RoutesTDevGame() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/level_1' element={<Level1 />} />
        <Route path='/level_2' element={<Level2 />} />
        <Route path='/level_3' element={<Level3 />} />
        <Route path='/level_4' element={<Level4 />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/instructive' element={<Instructive />} />
      </Routes>
    </BrowserRouter>
  )
}
