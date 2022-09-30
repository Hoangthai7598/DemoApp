import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProdcutItemProps } from '../../models/Product_Models';

export interface ProductState {
    listProduct: Array<ProdcutItemProps>
}

const initialState: ProductState = {
    listProduct: []
}


interface AddProductBody {
    name: string,
    description: string,
    price: string
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<AddProductBody>) {
            state.listProduct = state.listProduct.concat(action.payload)
        }
    }
})

export const { addProduct } = ProductSlice.actions
export default ProductSlice.reducer;