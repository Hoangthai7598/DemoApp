import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { RootStackParamList } from "../../constant";
import { addProduct } from "../../redux/Product/productSlice";
import { useAppDispatch } from "../../store";
import MInput from "../components/MInput";


type AddEditProductScreenProps = NativeStackScreenProps<RootStackParamList, 'ADD_EDIT_PRODCUT_SCREEN'>;


const AddEditProductScreen = ({ navigation, route }: AddEditProductScreenProps) => {

    const dispatch = useAppDispatch()
    const priceRef = useRef<any>();
    const nameRef = useRef<any>();
    const descripeRef = useRef<any>();

    const resetText = useCallback(() => {
        priceRef.current.resetText();
        nameRef.current.resetText()
        descripeRef.current.resetText()
    }, [])

    const addProductItem = () => {
        dispatch(addProduct({
            name: nameRef.current.getText(),
            description: descripeRef.current.getText(),
            price: priceRef.current.getText()
        }));
        resetText();
        Alert.alert('Add success');
    }

    return (
        <View style={styles.container}>
            <MInput containerStyle={{ marginTop: 15 }} ref={nameRef} placeHolder='Name' />
            <MInput containerStyle={{ marginTop: 15 }} ref={descripeRef} placeHolder='Descripte' />
            <MInput containerStyle={{ marginTop: 15 }} ref={priceRef} placeHolder='Price' keyboardType="numeric" />
            <TouchableOpacity onPress={addProductItem} style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddEditProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 14
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
})