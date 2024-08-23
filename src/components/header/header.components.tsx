import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

// Utilities
import { auth } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { signOut } from 'firebase/auth'
import { CartContext } from '../../contexts/cart.context'

const Header = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(UserContext)

  const { toggleCart } = useContext(CartContext)

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSingUpClick = () => {
    navigate('/sign-up')
  }
  const handleLogoClick = () => {
    navigate('/')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }
  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSingUpClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
