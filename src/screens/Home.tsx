import React, { useState, useReducer, useEffect, FC } from 'react'

import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native'

import { connect } from 'react-redux'

import { 
    onAvailability, 
    onSearchFoods,
    UserState, 
    ApplicationState, 
    ShoppingState, 
    Restaurant, 
    FoodModel 
} from '../redux'


interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _Home: FC<HomeProps> = (props) => {

    const { location } = props.userReducer
    const { availability } = props.shoppingReducer

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.navigation}> 
                <View style={styles.topLocation}>
                    <Text>
                        {`${location.name}, ${location.street}, ${location.city}`}
                    </Text>
                </View>
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
    },
    topLocation: { 
        marginTop: 50, 
        flex: 4, 
        backgroundColor: 'white', 
        paddingLeft: 20, 
        paddingRight: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

export const Home = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_Home)