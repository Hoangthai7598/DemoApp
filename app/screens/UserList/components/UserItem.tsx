import React from "react";
import { ActivityIndicator, StyleSheet, Switch, Text, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { UserItemResponseProps } from "../../../models/User_Models";
import { updateItem } from "../../../redux/User/userSlice";
import { useAppDispatch } from "../../../store";

interface UserItemProp {
    item: UserItemResponseProps | any
}

const UserItem = (props: UserItemProp) => {
    const { item } = props;
    const dispatch = useAppDispatch();
    const toggleSwitch = () => {
        const newItem = { ...item };
        if (item.enable) {
            newItem.enable = false;
            dispatch(updateItem(newItem));
        } else {
            newItem.enable = true;
            dispatch(updateItem(newItem));
        }
    };
    return (
        <View style={[styles.boxShadow, styles.containerView]}>
            <View style={[styles.boxShadow, styles.itemContainer]}>
                <FastImage
                    style={styles.img}
                    source={{
                        uri: item.picture,
                        priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.rightItem}>
                    <Text style={styles.idTxt} numberOfLines={1}>{item.id}</Text>
                    <Text style={styles.nameTxt} numberOfLines={1}>{item.title}. {item.firstName} {item.lastName}</Text>
                    {item.enable ?
                        <Text style={styles.nameTxt}>Email: {item?.email}</Text>
                        :
                        <></>
                    }
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={item.enalble ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={item.enable}
                    style={{ margin: 5 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10
    },
    itemContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
    },
    loadingView: {
        position: 'absolute',
        zIndex: 1024,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
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
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userStatus: {
        fontSize: 14,
        color: '#000'
    }
})

export default UserItem;