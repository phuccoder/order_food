import React, { FC } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { OrderModel } from '../redux'
import moment from 'moment'

interface OrderCardProps { 
    item: OrderModel
    onTap: Function
}

export const OrderCard: FC<OrderCardProps> = ({ item, onTap }) => {

    const orderStatus = () => {
        const status = item.orderStatus
        let statusIcon = require('../images/order_process.png')
        let statusMessage = status
        
        if (status.toLocaleLowerCase() ==='completed') {
            statusMessage = 'Delivered',
            statusIcon = require('../images/orders.png')
        }

        if (status.toLocaleLowerCase() ==='cancelled') {
            statusMessage = 'Cancelled',
            statusIcon = require('../images/warning-icon.png')
        }
        
        return (
            <View 
                style={{
                    display: 'flex',
                    flex: 3,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                <Image 
                    source={statusIcon} 
                    style={{ width: 60, height: 60 }}
                />
                <Text style={{ color: '#7c7c7c' }}>
                    {statusMessage.toLocaleUpperCase()}
                </Text>
            </View>
        )
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => onTap()}>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View 
                        style={{ 
                            display: 'flex', 
                            flex: 8, 
                            padding: 5, 
                            marginTop: 5, 
                            paddingLeft: 20,
                            justifyContent: 'space-around',
                            alignItems: 'flex-start'
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Order ID: {item.orderID}
                        </Text>
                        <Text style={{ color: '#7c7c7c', fontSize: 18 }}>
                            Order date: {moment(item.orderDate).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={{ color: '#7c7c7c', fontSize: 16 }}>
                            Total: 
                            <Text style={{ color: '#ff5733', fontWeight: 'bold' }}>
                                {` ${item.totalAmount.toFixed(2)} `}
                            </Text>
                            đ
                        </Text>
                    </View>
                    {orderStatus()}
                </View>
            </TouchableOpacity> 
    </View>
    )
}

const styles = StyleSheet.create({
    container: {     
        display: 'flex',
        flex: 1, 
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'row'
    }
})