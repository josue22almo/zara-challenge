import { Routes, Route } from 'react-router'
import { HomeScreen } from './screens/home.screen'
import { CharacterScreen } from './screens/character.screen'

function App() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path="character/:id" element={<CharacterScreen />} />
    </Routes>
  )
}

export default App
