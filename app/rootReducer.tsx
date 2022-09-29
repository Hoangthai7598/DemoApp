import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './screens/Auth/authSlice'

const rootReducer = combineReducers({
  auth: authSlice,
})

export default rootReducer
