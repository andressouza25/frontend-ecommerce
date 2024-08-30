import { combineReducers } from 'redux'
import userReducer from './reducers/user/user.reducer'
import cartReducer from './reducers/cart/cart.reduce'

const rootReducer = combineReducers({
  userReducer,
  cartReducer
})

export default rootReducer
