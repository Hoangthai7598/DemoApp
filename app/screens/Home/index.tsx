import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../constant";


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HOME'>;

interface itemProps {
    id: string,
    title: string,
    onPress: () => void
}


const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const listItem = [
        {
            id: '1',
            title: 'goToAddProduct',
            onPress: () => { navigation.navigate('ADD_EDIT_PRODCUT_SCREEN', {}) }
        },
        {
            id: '2',
            title: 'goToProductList',
            onPress: () => { navigation.navigate('PRODUCT_LIST') }
        },
        {
            id: '3',
            title: 'goToUserList',
            onPress: () => { navigation.navigate('USER_LIST') }
        }
    ]

    return (
        <View style={styles.container}>
            {listItem.map((item: itemProps) => {
                return (
                    <Button
                        key={item.id}
                        title={item.title}
                        onPress={item.onPress}
                    />
                )
            })}
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})