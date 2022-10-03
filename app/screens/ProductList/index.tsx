import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../constant";
import { ProdcutItemProps } from "../../models/Product_Models";
import { useAppSelector } from "../../store";
import ProductItem from "./components/ProductItem";

type ProductListScreenProps = NativeStackScreenProps<RootStackParamList, 'PRODUCT_LIST'>;

const ProductListScreen = ({ route, navigation }: ProductListScreenProps) => {

    const { listProduct } = useAppSelector((state) => state.product);

    const navigateToAddProduct = useCallback(() => {
        navigation.navigate('ADD_EDIT_PRODCUT_SCREEN', {})
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={navigateToAddProduct}
                    title="Add Product" />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
                data={listProduct}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderUserItem}
            />
        </View>
    )
}

export default ProductListScreen;

const renderUserItem = ({ item }: { item: ProdcutItemProps }) => {
    return <ProductItem item={item} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})