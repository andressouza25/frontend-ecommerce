import { onAuthStateChanged } from 'firebase/auth'
import { FunctionComponent, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'

// Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SingUpPage from './pages/sing-up/sing-up.page'

// Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'

const App: FunctionComponent = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)
  onAuthStateChanged(auth, async (user) => {
    // Se o usuário estiver logado no contexto e o usuário do firebase for nulo, devemos dar um SIGN OUT
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      return logoutUser()
    }

    // Se o usuário for nulo no contexto e não for nulo no firebase, devemos fazer o LOGIN
    const isSigninIn = !isAuthenticated && user
    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('id', '==', user.uid))
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()
      return loginUser(userFromFirestore as any)
    }
  })

  console.log(isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SingUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
