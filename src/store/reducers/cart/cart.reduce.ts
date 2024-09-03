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
    // CASE 1 - Abre o carrinho
    case CartActionTypes.toggleCart:
      return { ...state, isVisible: !state.isVisible }

    // CASE 2 - Adicionando um item no carrinho
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
    // CASE 3 - Remover produto do carrinho
    case CartActionTypes.removeProductFromCart:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        )
      }
    // CASE 4 - Adicionar produtos no carrinho
    case CartActionTypes.increaseCartProductQuantity:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      }
    // CASE 5 - Diminuir produtos do carrinho
    case CartActionTypes.decreaseCartProductQuantity:
      return {
        ...state,
        products: state.products
          .map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0)
      }
    // CASE 6 - Limpar o carrinho
    case CartActionTypes.clearCartProducts:
      return {
        ...state,
        products: []
      }

    default:
      return { ...state }
  }
}

export default cartReducer
