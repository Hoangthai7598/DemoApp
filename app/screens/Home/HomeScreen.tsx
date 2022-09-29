import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { LIMIT_ITEM_PER_PAGE, RootStackParamList } from "../../constant";
import { ListUserResponse, UserItemResponseProps } from "../../models/User_Models";
import { requestGetUserInfo } from "../../service/API/userAPI";
import { wait } from "../../utils";
import LoadingView from "../components/LoadingView";
import UserItem from "./components/UserItem";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HOME_SCREEN'>;

const HomeScreen = ({ route, navigation }: HomeScreenProps) => {

    const [listUser, setListUser] = useState<Array<UserItemResponseProps>>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const getListUser = async () => {
        setLoading(true);
        try {
            const response: ListUserResponse = await requestGetUserInfo({ page: pageIndex, limit: LIMIT_ITEM_PER_PAGE });
            setListUser(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (__DEV__) {
                console.log('error load list user', error)
            }
        }
    }

    useEffect(() => {
        getListUser();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        wait(2000).then(() => {
            getListUser();
            setRefreshing(false)
        });
    }

    return (
        <View style={styles.container}>
            {isLoading ?
                <LoadingView />
                :
                <FlatList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    style={styles.container}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={listUser}
                    keyExtractor={(item: UserItemResponseProps) => item.id}
                    renderItem={renderUserItem}
                />
            }
        </View>
    )
}

export default HomeScreen;

const renderUserItem = ({ item, index }: { item: UserItemResponseProps, index: number }) => {
    return <UserItem item={item} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})