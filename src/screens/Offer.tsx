import React, { FC, useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View,
    FlatList,
    Text,
    Alert,
    ActivityIndicator
} from 'react-native'

import { 
    ApplicationState, 
    onApplyOffer, 
    ShoppingState, 
    UserState,
    onGetOffers,
    OfferModel
} from '../redux'

import { connect } from 'react-redux'
import { OfferCard } from '../components'

interface OfferScreenProps { 
    userReducer: UserState
    shoppingReducer: ShoppingState
    onGetOffers: Function
    onApplyOffer: Function
}

const _Offer: FC<OfferScreenProps> = ({ userReducer, shoppingReducer, onGetOffers, onApplyOffer }) => {

    const { offers, appliedOffer } = shoppingReducer
    const { location, Cart } = userReducer

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        onGetOffers(location.postalCode)
        setTimeout(() => setIsLoading(false), 2000)
    }, [Cart])

    const onTapApply = (item: OfferModel) => {
        setIsLoading(true)
        let total = 0
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }
        const taxAmount = (total / 100 * 0.9) + 40
        const orderAmount = taxAmount + total
        setTimeout(() => setIsLoading(false), 1000)
        setTimeout(() => {
            if (orderAmount > item.minValue) {
                onApplyOffer(item, false)
                cusAlert(
                    `${item.promoCode} has been applied`,
                    `Offer applied with discount of ${item.offerPercentage}%`
                )
            } else {
                cusAlert(
                    'Something went wrong',
                    `You haven't reached the minimum order amount ${item.minValue}d to use ${item.promoCode} promo code`
                )
            }
        }, 1300)
    }

    const cusAlert = (title: string, msg: string) => {
        return (
            Alert.alert(
                title,
                msg,
                [{text: 'OK', onPress: () => {}}]
            )
        )
    }

    const onTapRemove = (item: OfferModel) => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
        setTimeout(() => {
            onApplyOffer(item, true)
            cusAlert(
                `${item.promoCode} has been removed`,
                `Discount of ${item.offerPercentage}% is no longer effect`
            )
        }, 1500)
    }

    const isOfferApplied = (item: OfferModel) => {
        if (appliedOffer._id) {
            return appliedOffer._id.toString() === item._id.toString()
        }
        return false
    }

    return (
        <View style={styles.container}>
            {isLoading &&
                    <View 
                        style={{ 
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center', 
                            zIndex: 1,
                            backgroundColor: '#rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <ActivityIndicator size="large" />
                    </View>
            }
            <View style={styles.navigation}> 
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                        Offers and Deals
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                {Array.isArray(offers) &&
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={offers}
                        renderItem={({ item}) => 
                            <OfferCard
                                isApplied={isOfferApplied(item)}
                                item={item}
                                onTapApply={onTapApply}
                                onTapRemove={onTapRemove}
                            />
                        }
                        keyExtractor={(item) => `${item._id}`}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F2F2F2'
    },
    navigation: { 
        flex: 1,  
        marginTop: 43
    },
    body: { 
        flex: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

export const OfferScreen = connect(mapStateToProps, { onGetOffers, onApplyOffer })(_Offer)