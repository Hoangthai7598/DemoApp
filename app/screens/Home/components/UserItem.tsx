import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserItemResponseProps } from "../../../models/User_Models";
import FastImage from 'react-native-fast-image'

interface UserItemProp {
    item: UserItemResponseProps
}

const UserItem = (props: UserItemProp) => {
    const { item } = props;
    return (
        <View style={[styles.boxShadow, styles.itemContainer]}>
            <FastImage
                style={styles.img}
                source={{
                    uri: item.picture,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.rightItem}>
                <Text style={styles.idTxt}>{item.id}</Text>
                <Text style={styles.nameTxt}>{item.title}. {item.firstName} {item.lastName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
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
    img: {
        width: 60,
        height: 60,
    },
    rightItem: {
        marginLeft: 5,
        flex: 1
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

export default UserItem;