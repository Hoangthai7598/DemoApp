export const SCREEN_ROUTER_APP = {
    USER_LIST: 'USER_LIST',
    PRODUCT_LIST: 'PRODUCT_LIST',
    ADD_EDIT_PRODCUT_SCREEN: "ADD_EDIT_PRODCUT_SCREEN",
    HOME: 'HOME'
}

export type RootStackParamList = {
    USER_LIST: undefined,
    PRODUCT_LIST: undefined,
    ADD_EDIT_PRODCUT_SCREEN: { id?: string },
    HOME: undefined
};

export const LIMIT_ITEM_PER_PAGE = 10;