import CartProduct from '../../../types/cart.types'
import CartActionTypes from './cart.actions-types'

interface InitialState {
  isVisible: boolean
  products: CartProduct[]
}

const initialState: InitialState = {
  isVisible: false,
  products: []
}

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // # Abre o carrinho #
    case CartActionTypes.toggleCart:
      return { ...state, isVisible: !state.isVisible }

    // # Adicionando um item no carrinho #
    case CartActionTypes.addProductToCart: {
      const product = action.payload

      // Verificar se o produto já está no carrinho
      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      )

      // Se sim -> aumentar sua quantidade
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }

      // Se não -> vai adicionar no carrinho
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }]
      }
    }

    default:
      return { ...state }
  }
}

export default cartReducer
