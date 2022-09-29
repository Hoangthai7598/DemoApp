import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { LIMIT_ITEM_PER_PAGE, RootStackParamList } from "../../constant";
import { ListUserResponse, UserItemResponseProps } from "../../models/User_Models";
import { requestGetUserInfo } from "../../service/API/userAPI";
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


    const getListUser = useCallback(async () => {
        setLoading(true);
        setPageIndex(1);
        try {
            const response: ListUserResponse = await requestGetUserInfo({ page: 1, limit: LIMIT_ITEM_PER_PAGE });
            setListUser(response.data);
            setLoading(false);
            setTotalPage(Math.ceil(response.total / LIMIT_ITEM_PER_PAGE));
        } catch (error) {
            setLoading(false);
            if (__DEV__) {
                console.log('error load list user', error)
            }
        }
    }, []);

    useEffect(() => {
        getListUser();
    }, []);

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
            setPageIndex(pageIndex + 1)
            getListUserMore(pageIndex + 1);
        }
    }, [totalPage, pageIndex])

    const getListUserMore = useCallback(async (nextPage: number) => {
        setLoadingMore(true);
        try {
            const response: ListUserResponse = await requestGetUserInfo({ page: nextPage, limit: LIMIT_ITEM_PER_PAGE });
            setListUser((prevState) => prevState.concat(response.data));
            setLoadingMore(false);
            setTotalPage(Math.ceil(response.total / LIMIT_ITEM_PER_PAGE));
        } catch (error) {
            setLoadingMore(false);
            if (__DEV__) {
                console.log('error load list user more', error)
            }
        }
    }, [])

    const listFooter = useCallback(() => {
        if (isLoadingMore) {
            return (
                <LoadingView />
            )
        }
        return <></>
    }, [isLoadingMore]);

    return (
        <View style={styles.container}>
            {isLoading ?
                <LoadingView />
                :
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
            }
        </View>
    )
}

export default UserListScreen;

const renderUserItem = ({ item, index }: { item: UserItemResponseProps, index: number }) => {
    return <UserItem item={item} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})