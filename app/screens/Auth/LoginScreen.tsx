import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LIMIT_ITEM_PER_PAGE = 10;

const LoginScreen = () => {

    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getListUserFromAPI = async () => {
        try {
            const response = await fetch(`https://dummyapi.io/data/v1/user?page=${pageIndex}&limit=${LIMIT_ITEM_PER_PAGE}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'app-id': '633410c907616a25b76ff87c'
                }
            });
            const json = await response.json();
            console.log('json', json);
            return json.movies;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListUserFromAPI();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 13, color: '#000' }}>test</Text>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})