import React from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingView = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='blue' />
        </View>
    )
}

export default LoadingView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})