import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, ActivityIndicator } from "react-native";
import { UserItemFullResponseProps, UserItemResponseProps } from "../../../models/User_Models";
import FastImage from 'react-native-fast-image'
import { requestGetUserInfoFull } from "../../../service/API/userAPI";

interface UserItemProp {
    item: UserItemResponseProps
}

const UserItem = (props: UserItemProp) => {
    const { item } = props;
    const [isEnabled, setIsEnabled] = useState(false);
    const [userInfo, setUserInfo] = useState<UserItemFullResponseProps | null>();
    const [loading, setLoading] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            setUserInfo(null);
        }
        else {
            getFullData();
        }
    };

    const getFullData = async () => {
        setLoading(true);
        try {
            const response: UserItemFullResponseProps = await requestGetUserInfoFull(item.id);
            setUserInfo(response);
            setIsEnabled(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setIsEnabled(false);
            if (__DEV__) {
                console.log('error get full data', error);
            }
        }
    }

    useEffect(() => {
        getFullData();
    }, []);


    return (
        <View style={[styles.boxShadow, styles.containerView]}>
            {loading ?
                <View style={styles.loadingView}>
                    <ActivityIndicator size='large' color='blue' />
                </View>
                :
                null
            }
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
                    {userInfo?.email ?
                        <Text style={styles.nameTxt}>Email: {userInfo?.email}</Text>
                        :
                        <></>
                    }
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
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