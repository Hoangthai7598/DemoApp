import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREEN_ROUTER_APP } from '../constant';
import AddEditProductScreen from '../screens/AddEditProduct';
import HomeScreen from '../screens/Home';
import ProductListScreen from '../screens/ProductList';
import UserListScreen from '../screens/UserList';

const RootStack = createNativeStackNavigator();

const {
    HOME,
    USER_LIST,
    PRODUCT_LIST,
    ADD_EDIT_PRODCUT_SCREEN
} = SCREEN_ROUTER_APP

const mainScreen = [
    {
        name: HOME,
        component: HomeScreen
    },
    {
        name: USER_LIST,
        component: UserListScreen
    },
    {
        name: PRODUCT_LIST,
        component: ProductListScreen
    },
    {
        name: ADD_EDIT_PRODCUT_SCREEN,
        component: AddEditProductScreen
    }
];

interface mainItem {
    name: string,
    component: React.ComponentType<any>;
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={() => ({
                    // headerShown: false,
                })}
            >
                {mainScreen.map((mainItem: mainItem) => {
                    return (
                        <RootStack.Screen name={mainItem.name} component={mainItem.component} key={mainItem.name} />
                    )
                })}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
