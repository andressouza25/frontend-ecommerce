import userEvent from '@testing-library/user-event'
import { renderWithRedux } from '../../helpers/test.helpers'
import Cart from './cart.component'

describe('Cart', () => {
  it('should show correct cart products', () => {
    const { getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              imageUrl: 'image_url',
              name: 'Boné',
              price: 100,
              quantity: 10
            }
          ]
        }
      } as any
    })

    getByText(/boné/i)
    getByText('R$100')
    getByText('10')
    getByText('Total: R$1000')
    getByText(/Ir para o Checkout/i)
  })

  it('should not show checkout button and should show an empty message if cart is empty', () => {
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: { products: [] }
      } as any
    })

    getByText(/seu carrinho está vazio!/i)
    expect(queryByText(/ir para o checkout/i)).toBeNull()
  })

  it('should increase product quantity on increase click', () => {
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              imageUrl: 'image_url',
              name: 'Boné',
              price: 100,
              quantity: 10
            }
          ]
        }
      } as any
    })

    const increseButton = getByLabelText(/increase quantity of boné/i)

    userEvent.click(increseButton)
    getByText('11')
  })

  it('should decrease product quantity on decrease click', () => {
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              imageUrl: 'image_url',
              name: 'Boné',
              price: 100,
              quantity: 10
            }
          ]
        }
      } as any
    })

    const decreaseButton = getByLabelText(/decrease quantity of boné/i)

    userEvent.click(decreaseButton)
    getByText('9')
  })

  it('should remove product on remoce click', () => {
    const { getByLabelText, queryByText, getByText } = renderWithRedux(
      <Cart />,
      {
        preloadedState: {
          cartReducer: {
            products: [
              {
                id: '1',
                imageUrl: 'image_url',
                name: 'Boné',
                price: 100,
                quantity: 10
              }
            ]
          }
        } as any
      }
    )

    const removeButton = getByLabelText(/remove boné/i)

    userEvent.click(removeButton)
    expect(queryByText(/boné/i)).toBeNull()
    getByText(/seu carrinho está vazio!/i)
  })
})
