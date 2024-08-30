import User from '../../../types/user.types'
import UserActionTypes from './user.actions-types'

export const loginUser = (payload: User) => ({
  type: UserActionTypes.LOGIN,
  payload
})

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT
})
