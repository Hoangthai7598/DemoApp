import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './redux/Auth/authSlice'
import productSlice from './redux/Product/productSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice
})

export default rootReducer
