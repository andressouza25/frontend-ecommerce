import { FunctionComponent, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome
} from 'react-icons/ai'

// Styles
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'

// Components
import Header from '../../components/header/header.components'
import CustomButton from '../../components/custom-button/custom-button.component'

// Utilities
import Colors from '../../theme/theme.color'
import { CartContext } from '../../contexts/cart.context'

const PaymentConfirmationPage: FunctionComponent = () => {
  const { clearProducts } = useContext(CartContext)
  const [searchParams] = useSearchParams()
  const status = searchParams.get('success')

  const isCanceled = searchParams.get('canceled') === 'true'

  useEffect(() => {
    if (status === 'true') {
      clearProducts()
    }
  })

  const navigate = useNavigate()
  const handleGoToHomePageClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua compra foi finalizado com sucesso!</p>
            </>
          )}
          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente.
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomePageClick}
          >
            Ir para Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmationPage
