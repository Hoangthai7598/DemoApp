import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { Linking } from 'react-native';
import { SCREEN_ROUTER_APP } from '../constant';
import HomeScreen from '../screens/Home/HomeScreen';

const RootStack = createNativeStackNavigator();

const {
    HOME_SCREEN,
    PRODUCT_SCREEN,
    ADD_EDIT_PRODCUT_SCREEN
} = SCREEN_ROUTER_APP

const mainScreen = [
    {
        name: HOME_SCREEN,
        component: HomeScreen
    },
    {
        name: PRODUCT_SCREEN,
        component: HomeScreen
    },
    {
        name: ADD_EDIT_PRODCUT_SCREEN,
        component: HomeScreen
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
