import { combineReducers } from '@reduxjs/toolkit'
import productSlice from './redux/Product/productSlice'

const rootReducer = combineReducers({
  product: productSlice
})

export default rootReducer
