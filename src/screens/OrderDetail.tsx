import React, { useState, useEffect, FC } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Dimensions,
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { 
    ApplicationState,
    UserState,
    OrderModel,
    onCancelOrder,
    onGetOrder
} from '../redux'

import moment from 'moment'
import { connect } from 'react-redux'
import { FoodCard, ButtonWithTitle, ButtonWithIcon, MapCustom } from '../components'

interface OrderDetailScreenProps { 
    userReducer: UserState
    navigation: { getParam: Function, goBack: Function}
    onCancelOrder: Function
    onGetOrder: Function
}

const _OrderDetail: FC<OrderDetailScreenProps> = (props) => {

    const { goBack, getParam } = props.navigation

    const { user } = props.userReducer

    const [isLoading, setIsLoading] = useState(false)

    const order = getParam('order') as OrderModel

    useEffect(() => {
        props.onGetOrder(user)
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500)
    }, [])

    const headerDetail = () => {
        return (
            <View style={{ padding: 10, alignItems: 'flex-start' }}>
                <Text style={styles.textDetail}>
                    Order date: {moment(order.orderDate).format('Do MMM YY, h:mm a')}
                </Text>
                <Text style={styles.textDetail}>
                    Paid through: {order.paidThrough}
                </Text>
                <Text style={styles.textDetail}>
                    Amount: {order.totalAmount}
                </Text>
                <Text style={styles.textDetail}>
                    Status: {order.orderStatus.toUpperCase()}
                </Text>
            </View>
        )
    }

    const footerDetail = () => {
        if (order.orderStatus.toLowerCase() === 'cancelled') {
            return (
                <Text style={{ fontSize: 18, padding: 30, textAlign: 'center' }}>
                    This order is {order.orderStatus.toLocaleUpperCase()}
                </Text>
            )
        } else {
            return (
                <View>
                    <View>
                        <MapCustom 
                            width={Dimensions.get('screen').width-20} 
                            height={350}
                            orderID={order.orderID}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <ButtonWithTitle
                            title='Cancel Order'
                            width={Dimensions.get('screen').width - 60}
                            height={50}
                            onTap={onTapCancel}
                        />
                    </View>
                </View>
            )
        }
    }

    const onTapCancel = () => {
        Alert.alert(
            `Cancel order ${order.orderID}?`,
            'This action cannot be reversed!',
            [
                {text: 'Cancel', onPress:() => {}, style: 'destructive'},
                {
                    text: 'Submit',
                    onPress:() => {
                        setIsLoading(true)
                        props.onCancelOrder(order, user)
                        setTimeout(() => props.onGetOrder(user), 500)
                        setTimeout(() => setIsLoading(false), 3000)
                        setTimeout(() => goBack(), 3500)
                    }, 
                    style: 'default'
                }
            ]
        )
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
                <View style={styles.viewMyCart}>
                    <ButtonWithIcon
                        icon={require('../images/back_arrow.png')}
                        onTap={() => goBack()}
                        width={30}
                        height={30}
                    />
                    <Text style={{ fontSize: 30, fontWeight: '500', marginLeft: 20}}>
                        Order ID {order.orderID}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={order.items}
                    renderItem={({ item}) =>
                        <FoodCard 
                            item={item.food}
                            onTap={() => {}}
                            onUpdateCart={() => {}}
                            quantity={item.unit}
                        />
                    }
                    keyExtractor={(item) => `${item._id}`}
                    ListHeaderComponent={headerDetail}
                    ListFooterComponent={footerDetail}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1,  marginTop: 43, },
    body: { flex: 9, justifyContent: 'center', alignItems: 'center' },
    viewMyCart: { 
        display: 'flex', 
        height: 60, 
        justifyContent: 'flex-start', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 20, 
        marginRight: 20
    },
    textDetail: {
        fontSize: 18,
        color: '#7c7c7c',
        padding: 5
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

export const OrderDetailScreen = connect(mapStateToProps, { onCancelOrder, onGetOrder })(_OrderDetail)