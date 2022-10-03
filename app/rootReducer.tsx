import { combineReducers } from '@reduxjs/toolkit'
import productSlice from './redux/Product/productSlice'
import userSlice from './redux/User/userSlice'

const rootReducer = combineReducers({
  product: productSlice,
  user:userSlice
})

export default rootReducer
