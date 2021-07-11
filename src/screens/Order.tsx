import React, { useEffect, useState, FC } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    FlatList, 
    ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'

import { 
    ApplicationState, 
    ShoppingState,
    UserState,
    onGetOrder,
    OrderModel
} from '../redux'

import { OrderCard, ButtonWithIcon } from '../components'

import { useNavigation } from '../utils'

interface OrderScreenProps { 
    userReducer: UserState
    shoppingReducer: ShoppingState
    navigation: { getParam: Function, goBack: Function}
    onGetOrder: Function
}

const _Order: FC<OrderScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const { goBack } = props.navigation

    const { user, orders } = props.userReducer

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 2000)
        props.onGetOrder(user)
    }, [])

    const onTapOrder = (order: OrderModel) => {
        navigate('OrderDetailPage', { order })
    }

    const orderView = (child: Function) => {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View style={styles.viewMyCart}>
                        <ButtonWithIcon
                            icon={require('../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={30}
                            height={30}
                        />
                        <Text style={{ fontSize: 30, fontWeight: '500', marginLeft: 20}}>
                            My Order
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    {child()}
                </View>
            </View>
        )
    }

    if (isLoading) {
        const activityIndicator = () => { return <ActivityIndicator size="large" /> }
        return orderView(activityIndicator)
    } else if (orders.length > 0) {
        const flatList = () => {
            return (
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={orders}
                    renderItem={({ item }) =>
                        <OrderCard item={item} onTap={() => onTapOrder(item)} />
                    }
                    keyExtractor={(item) => `${item._id}`}
                />
            )
        }
        return orderView(flatList)
    } else {
            const emptyList = () => {
                return (
                    <Text style={{ fontSize: 20 }}>
                        Your order is empty
                    </Text>
                )
            }
            return orderView(emptyList)
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1,  marginTop: 43, },
    body: { flex: 9, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 2, justifyContent: 'center', paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
    amountDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        margin: 5
    },
    viewMyCart: { 
        display: 'flex', 
        height: 60, 
        justifyContent: 'flex-start', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 20, 
        marginRight: 20
    },
    viewPayment: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
    },
    paymentContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 5,
        backgroundColor: '#e3be74'
    },
    paymentOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 120,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#a0a0a0',
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width: 115,
        height: 80
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

export const OrderScreen = connect(mapStateToProps, { onGetOrder })(_Order)