import { onAuthStateChanged } from 'firebase/auth'
import { FunctionComponent, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'

// Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import SingUpPage from './pages/sing-up/sing-up.page'
import ExplorePage from './pages/explore/explore.page'

// Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore.converters'

// Components
import Loading from './components/loading/loading.component'
import Cart from './components/cart/cart.component'

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)
  onAuthStateChanged(auth, async (user) => {
    // Se o usuário estiver logado no contexto e o usuário do firebase for nulo, devemos dar um SIGN OUT
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    // Se o usuário for nulo no contexto e não for nulo no firebase, devemos fazer o LOGIN
    const isSigninIn = !isAuthenticated && user
    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user.uid)
        )
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore)
      return setIsInitializing(false)
    }
    return setIsInitializing(false)
  })

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SingUpPage />} />
      </Routes>
      <Cart />
    </BrowserRouter>
  )
}

export default App
