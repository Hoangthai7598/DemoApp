import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProdcutItemProps } from "../../../models/Product_Models";

interface ProductItemInterface {
    item: ProdcutItemProps
}

const ProductItem = (props: ProductItemInterface) => {
    const { item } = props;
    return (
        <View style={[styles.boxShadow, styles.itemContainer]}>
            <Text style={styles.idTxt} numberOfLines={1}>Name: {item.name}</Text>
            <Text style={styles.nameTxt} numberOfLines={1}>Description: {item.description}</Text>
            <Text style={styles.nameTxt} numberOfLines={1}>Price {item.price} USD</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    idTxt: {
        fontSize: 15,
        color: '#000'
    },
    nameTxt: {
        fontSize: 13,
        color: '#000',
        fontWeight: 'bold'
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default React.memo(ProductItem);