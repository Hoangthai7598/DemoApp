import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View, Switch } from "react-native";
import { RootStackParamList } from "../../constant";
import { changeActive } from "../../redux/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store";


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HOME'>;

interface itemProps {
    id: string,
    title: string,
    onPress: () => void
}


const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((state) => state.auth);
    const toggleSwitch = () => { dispatch(changeActive(!isActive)) };

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
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isActive}
            />
            {listItem.map((item: itemProps) => {
                return (
                    <View
                        style={{ marginBottom: 10 }}
                        key={item.id}
                    >
                        <Button
                            title={item.title}
                            onPress={item.onPress}
                        />
                    </View>
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