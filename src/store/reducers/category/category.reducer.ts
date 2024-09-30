import Category from '../../../types/category.types'
import CategoryActionsTypes from './category.actions-types'

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}
const categoryReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case CategoryActionsTypes.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true }

    case CategoryActionsTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload }

    case CategoryActionsTypes.FETCH_CATEGORIES_FAILURE:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
export default categoryReducer
