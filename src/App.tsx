import { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
