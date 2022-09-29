import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isLogin: boolean,
    token: any,
    error: null
}

const initialState: AuthState = {
    isLogin: false,
    token: null,
    error: null
}


export type LoginProps = {
    email: string
    password: string
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginProps>) {
            state.isLogin = true;
            state.error = null;
        },
        loginUserSuccess(state, action: PayloadAction<string>) {
            state.isLogin = false;
            state.token = action.payload
        },
        loginUserFailed(state, action: PayloadAction<any>) {
            state.isLogin = false;
            state.error = action.payload;
        },
        logOut(state) {
            state.token = null;
        }
    }
})

export const { loginUser, loginUserSuccess, loginUserFailed, logOut } = AuthSlice.actions
export default AuthSlice.reducer;