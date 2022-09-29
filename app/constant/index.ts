export const SCREEN_ROUTER_APP = {
    HOME_SCREEN: 'HOME_SCREEN',
    PRODUCT_SCREEN: 'SPLASH',
    ADD_EDIT_PRODCUT_SCREEN: "ADD_EDIT_PRODCUT_SCREEN",
}

export type RootStackParamList = {
    HOME_SCREEN: undefined,
    PRODUCT_SCREEN: { id: string },
    ADD_EDIT_PRODCUT_SCREEN: { id: string }
};

export const LIMIT_ITEM_PER_PAGE = 10;