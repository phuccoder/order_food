import React, { useState, useReducer, useEffect, FC } from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native'

import { connect } from 'react-redux'
import { SearchBar, ButtonWithIcon, RestaurantCard, CategoryCard } from '../components'

import { 
    onAvailability, 
    onSearchFoods,
    UserState, 
    ApplicationState, 
    ShoppingState, 
    Restaurant, 
    FoodModel 
} from '../redux'

import { useNavigation } from '../utils'

interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _Home: FC<HomeProps> = (props) => {

    const { navigate } = useNavigation()

    const { location } = props.userReducer
    const { availability } = props.shoppingReducer
    const { categories, foods, restaurants } = availability

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )
    }, [])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item})
    }

    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}> 
                <View style={styles.location}>
                    <ButtonWithIcon 
                        onTap={() => {}}
                        icon={require('../images/delivery_icon.png')} 
                        width={20} 
                        height={20} 
                    />
                    <Text>{`${location.name},${location.street},${location.city}`} </Text> 
                    <ButtonWithIcon 
                        onTap={() => {}}
                        icon={require('../images/edit_icon.png')} 
                        width={20} 
                        height={20} 
                    />
                </View>
                <View style={styles.viewSort}>
                    <SearchBar 
                        didTouch={() => {
                            navigate('SearchPage')
                        }}
                        onTextChange={() => {}}
                    />
                    <ButtonWithIcon 
                        onTap={() => {}}
                        icon={require('../images/hambar.png')} 
                        width={50} 
                        height={40} 
                    />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem ={({ item }) =>  <CategoryCard item={item} onTap={() => { alert('Category tapped') }} /> } 
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }}> 
                            Top Restaurants
                        </Text>
                    </View>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }}> 
                            30 Minutes Foods
                        </Text>
                    </View>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapFood} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />
                </ScrollView>
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
    location: { 
        marginTop: 50, 
        flex: 4, 
        backgroundColor: 'white', 
        paddingLeft: 20, 
        paddingRight: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    viewSort: { 
        display: 'flex', 
        height: 60, 
        justifyContent: 'space-around', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 4
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

export const HomeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_Home)