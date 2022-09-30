import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Switch, Text } from "react-native";
import { LIMIT_ITEM_PER_PAGE, RootStackParamList } from "../../constant";
import { ListUserResponse, UserItemResponseProps } from "../../models/User_Models";
import { changeActive } from "../../redux/Auth/authSlice";
import { requestGetUserInfo, requestGetUserInfoNoKey } from "../../service/API/userAPI";
import { useAppDispatch, useAppSelector } from "../../store";
import { wait } from "../../utils";
import LoadingView from "../components/LoadingView";
import UserItem from "./components/UserItem";

type UserListScreenProps = NativeStackScreenProps<RootStackParamList, 'USER_LIST'>;

const UserListScreen = ({ route, navigation }: UserListScreenProps) => {

    const [listUser, setListUser] = useState<Array<UserItemResponseProps>>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const { isActive } = useAppSelector((state) => state.auth);

    const getListUser = useCallback(async () => {
        setLoading(true);
        setPageIndex(1);
        setListUser([]);
        try {
            const response: ListUserResponse = await (isActive ?
                requestGetUserInfo({ page: 1, limit: LIMIT_ITEM_PER_PAGE }) :
                requestGetUserInfoNoKey({ page: 1, limit: LIMIT_ITEM_PER_PAGE, })
            )
            setListUser(response.data);
            setLoading(false);
            setTotalPage(Math.ceil(response.total / LIMIT_ITEM_PER_PAGE));
        } catch (error) {
            setLoading(false);
            if (__DEV__) {
                console.log('error load list user', error)
            }
        }
    }, [isActive]);

    useEffect(() => {
        getListUser();
    }, [isActive]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getListUser();
            setRefreshing(false)
        });
    }, []);

    const onEndReached = useCallback(() => {
        if (pageIndex <= totalPage) {
            getListUserMore(pageIndex + 1);
            setPageIndex(pageIndex + 1);
        }
    }, [totalPage, pageIndex])

    const getListUserMore = useCallback(async (nextPage: number) => {
        setLoadingMore(true);
        try {
            const response: ListUserResponse = await (isActive ?
                requestGetUserInfo({ page: nextPage, limit: LIMIT_ITEM_PER_PAGE })
                :
                requestGetUserInfoNoKey({ page: nextPage, limit: LIMIT_ITEM_PER_PAGE }))
            setListUser((prevState) => prevState.concat(response.data));
            setLoadingMore(false);
            setTotalPage(Math.ceil(response.total / LIMIT_ITEM_PER_PAGE));
        } catch (error) {
            setLoadingMore(false);
            if (__DEV__) {
                console.log('error load list user more', error)
            }
        }
    }, [isActive])

    const listFooter = useCallback(() => {
        if (isLoadingMore) {
            return (
                <LoadingView />
            )
        }
        return <></>
    }, [isLoadingMore]);

    const dispatch = useAppDispatch();
    const toggleSwitch = () => { dispatch(changeActive(!isActive)) };

    return (
        <View style={styles.container}>
            {isLoading ?
                <LoadingView />
                :
                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isActive}
                            style={{ margin: 10 }}
                        />
                        <Text style={styles.userStatus}>{isActive ? 'activation' : 'deactivation'}</Text>
                    </View>
                    <FlatList
                        removeClippedSubviews
                        getItemLayout={(_, index) => ({
                            length: 60 + 20, //  HEIGHT + (MARGIN_VERTICAL * 2)
                            offset: (60 + 20) * (index),  //  ( HEIGHT + (MARGIN_VERTICAL*2) ) * (index)
                            index,
                        })}
                        maxToRenderPerBatch={10}
                        refreshing={refreshing}
                        onEndReached={onEndReached}
                        onRefresh={onRefresh}
                        style={styles.container}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={listUser}
                        ListFooterComponent={listFooter}
                        keyExtractor={(item: UserItemResponseProps) => item.id}
                        renderItem={renderUserItem}
                    />
                </View>
            }
        </View>
    )
}

export default UserListScreen;

const renderUserItem = ({ item }: { item: UserItemResponseProps }) => {
    return <UserItem item={item} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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