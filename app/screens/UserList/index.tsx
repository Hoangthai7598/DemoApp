import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LoadingView from "../../components/LoadingView";
import { RootStackParamList } from "../../constant";
import { UserItemResponseProps } from "../../models/User_Models";
import { fetchListUserAsync, fetchListUserMoreAsync } from "../../redux/User/userThunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { wait } from "../../utils";
import UserItem from "./components/UserItem";

type UserListScreenProps = NativeStackScreenProps<RootStackParamList, 'USER_LIST'>;

const UserListScreen = ({ route, navigation }: UserListScreenProps) => {

    const { listUser, isLoading, pageIndex, totalPage, isLoadingMore } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const getListUser = useCallback(async () => {
        dispatch(fetchListUserAsync());
    }, []);

    useEffect(() => {
        if (listUser.length === 0) {
            getListUser();
        }
    }, [listUser]);

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
            dispatch(fetchListUserMoreAsync(pageIndex + 1))
        }
    }, [pageIndex, totalPage])

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

const renderUserItem = ({ item }: { item: UserItemResponseProps }) => {
    return <UserItem item={item} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})