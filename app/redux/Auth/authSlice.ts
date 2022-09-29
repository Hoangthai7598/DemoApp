import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isActive: boolean
}

const initialState: AuthState = {
    isActive: true
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeActive(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
        }
    }
})

export const { changeActive } = AuthSlice.actions
export default AuthSlice.reducer;