import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserItemFullResponseProps, UserItemResponseProps } from '../../models/User_Models';
import { fetchListUserAsync, fetchListUserMoreAsync } from './userThunk';

export interface ProductState {
    listUser: Array<UserItemResponseProps | UserItemFullResponseProps>,
    isLoading: boolean,
    isError: any,
    pageIndex: number,
    totalPage: number,
    isLoadingMore: boolean,
    errorLoadMore: any
}

const initialState: ProductState = {
    listUser: [],
    isLoading: true,
    isError: null,
    pageIndex: 1,
    totalPage: 1,
    isLoadingMore: false,
    errorLoadMore: null
}

const updateItemUser = (item: UserItemFullResponseProps, arr: Array<UserItemResponseProps | UserItemFullResponseProps>) => {
    let cpyArr = [...arr]
    const indexItem = cpyArr.findIndex((itemArr) => itemArr.id === item.id);
    if (indexItem !== -1) {
        cpyArr[indexItem] = item;
    }
    return cpyArr;
}

interface userThunksActions {
    totalPage: number,
    listUsers: Array<UserItemResponseProps>
}


const ProductSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateItem(state, action: PayloadAction<UserItemFullResponseProps | any>) {
            state.listUser = updateItemUser(action.payload, state.listUser);
        }
    },
    extraReducers: (builer) => {
        builer.addCase(fetchListUserAsync.pending, () => {
            initialState;
        }),
            builer.addCase(fetchListUserAsync.fulfilled, (state, action: PayloadAction<userThunksActions>) => {
                state.listUser = action.payload.listUsers;
                state.totalPage = action.payload.totalPage;
                state.isLoading = false;
            }),
            builer.addCase(fetchListUserAsync.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builer.addCase(fetchListUserMoreAsync.pending, (state) => {
            state.isLoadingMore = true;
            state.pageIndex = state.pageIndex + 1;
            state.errorLoadMore = null;
        }),
            builer.addCase(fetchListUserMoreAsync.fulfilled, (state, action: PayloadAction<userThunksActions>) => {
                state.listUser = state.listUser.concat(action.payload.listUsers);
                state.totalPage = action.payload.totalPage;
                state.isLoadingMore = false;
            }),
            builer.addCase(fetchListUserMoreAsync.rejected, (state) => {
                state.isLoadingMore = false;
                state.errorLoadMore = true;
            });
    },
})

export const { updateItem } = ProductSlice.actions
export default ProductSlice.reducer;