import React, { useState, useEffect, FC, createRef } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    Dimensions, 
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'

import { connect } from 'react-redux'

import { 
    ApplicationState, 
    ShoppingState, 
    onUpdateCart, 
    UserState,
    onCreateOrder,
    onApplyOffer
} from '../redux'

import { FoodCardInfo, ButtonWithTitle } from '../components'
import PaymentTypePopup from 'react-native-raw-bottom-sheet'

import { checkExistence, useNavigation } from '../utils'

interface CartScreenProps { 
    userReducer: UserState
    shoppingReducer: ShoppingState
    onUpdateCart: Function
    onCreateOrder: Function
    onApplyOffer: Function
}

const _Cart: FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const [totalAmount, setTotalAmount] = useState(0)
    const [pureTotalAmount, setPureTotalAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const { Cart, user, location } = props.userReducer
    const { appliedOffer } = props.shoppingReducer

    const popupRef = createRef<PaymentTypePopup>()

    useEffect(() => {
        onCalculateAmount()
    }, [Cart, appliedOffer])

    const onCalculateAmount = () => {
        let total = 0
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }
        setPureTotalAmount(total)
        if (appliedOffer._id) {
            total = total - total*(appliedOffer.offerPercentage / 100)
        }
        setTotalAmount(total)
    }

    const onTapProceedPayment = () => {
        if (user.verified) {
            popupRef.current?.open()
        } else {
            navigate('LoginPage')
        }
    }

    const onTapPlaceOrder = () => {
        setIsLoading(true)
        props.onCreateOrder(Cart, user)
            appliedOffer._id && props.onApplyOffer(appliedOffer, true)
            Cart.map(item => {
                item.unit = 0
                onUpdateCart(item)
        })
        setTimeout(() => {
            setIsLoading(false)
            popupRef.current?.close()
            Alert.alert(
                'Order submitted', 
                'Our warehouse will be started preparing your items',
                [{text: 'OK', onPress: ()=> {}}]
            )
        }, 1000)
    }

    const popupView = () => {
        return (
            <PaymentTypePopup
                height={400}
                ref={popupRef}
                closeOnDragDown
                closeOnPressMask
                closeOnPressBack
                customStyles={{
                    wrapper: { backgroundColor: 'transparent' },
                    draggableIcon: { backgroundColor: '#000' },
                    container: { justifyContent: 'flex-start', alignItems: 'center' }
                }}
            >
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
                                backgroundColor: '#rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <ActivityIndicator size="large" />
                        </View>
                }
                <View style={styles.viewPayment}>
                    <View style={styles.paymentContent}>
                        <Text style={{ fontSize: 20 }}>
                            Total payment
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {`${totalAmount.toFixed(2)}đ`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', display: 'flex', height: 100, padding: 20 }}>
                        <Image source={require('../images/delivery_icon.png')} style={{ width: 50, height: 50 }}/>
                        <View>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', padding: 5 }}>
                                Your location
                            </Text>
                            <Text style={{ fontSize: 16, color: 'gray', width: Dimensions.get('screen').width - 60 }}>
                                {`${location.name}, ${location.street}, ${location.city}`}
                            </Text>
                        </View>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity onPress={onTapPlaceOrder} style={styles.options}>
                                <Image style={styles.icon} source={require('../images/cod_icon.png')}/>
                                <Text>Cash on deliver</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity onPress={onTapPlaceOrder} style={styles.options}>
                                <Image source={require('../images/card_icon.png')} style={styles.icon}/>
                                <Text>Credit card</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </PaymentTypePopup>
        )
    }

    if (Cart.length > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View style={styles.viewMyCart}>
                        <Text style={{ fontSize: 30, fontWeight: '500'}}>
                            My Cart
                        </Text>
                        {user.token &&
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigate("OrderPage")}>
                                <Image source={require('../images/orders.png')} style={{  width: 60, height: 60 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={Cart}
                        renderItem={({ item }) =>
                            <FoodCardInfo item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />
                        }
                        keyExtractor={(item) => `${item._id}`}
                    />  
                </View>
                <View style={styles.footer}>
                    <View style={styles.amountDetails}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>
                            Total:
                        </Text>
                        <Text style={{ fontWeight: "600" }}>
                            {appliedOffer._id &&
                                <Text style={{ color: 'green' }}>
                                    {`(${appliedOffer.offerPercentage}% off)`}
                                    <Text style={{ textDecorationLine: 'line-through' }}>
                                        {` ${pureTotalAmount.toFixed(2)}đ `}
                                    </Text>
                                </Text>
                            }
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {totalAmount.toFixed(2)}đ
                            </Text>
                        </Text>
                    </View>
                    <ButtonWithTitle title="Proceed Payment" height={50} width={320} onTap={onTapProceedPayment} />
                </View>
                {popupView()}
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View style={styles.viewMyCart}>
                        <Text style={{ fontSize: 30, fontWeight: '500'}}>
                            My Cart
                        </Text>
                        {user.token && 
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { navigate("OrderPage") }}>
                                <Image source={require('../images/orders.png')} style={{ width: 60, height: 60 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 20 }}>
                        Your cart is empty
                    </Text>
                </View>
            </View>
        )
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
        justifyContent: 'space-between', 
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

export const CartScreen = connect(mapStateToProps, { onUpdateCart, onCreateOrder, onApplyOffer })(_Cart)