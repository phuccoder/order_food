import React, { useState, useReducer, useEffect } from 'react'

import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native'

export const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>

            </View>
            <View style={styles.body}>
                <Text>
                    Home screen
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navigation: {
        flex: 2,
     },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})