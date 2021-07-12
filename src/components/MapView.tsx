import React, { FC } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Image } from 'react-native'

export interface MapCustomProps {
    width: number
    height: number
    orderID: string
}

export const MapCustom: FC<MapCustomProps> = ({ width, height, orderID }) => {

    return (
        <View style={styles.container}>
            <MapView
                style={{ width: width, height: height, borderRadius: 5 }}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: -0.06,
                    longitudeDelta: 0.01
                }}
            >

                <Marker 
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title='Restaurant'
                    description='updating...'
                >
                    <View
                        style={{
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View style={{ borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../images/delivery_icon.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                    </View>
                </Marker>

                <Marker
                    coordinate={{ latitude: 37.7849, longitude: -122.4204 }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat
                    rotation={80}
                    title={`Order ID ${orderID}`}
                    description='Your order has been processed and is on its way to you.'
                >
                    <Image
                        source={require('../images/car.png')}
                        style={{ width: 50, height: 50 }}
                    />
                </Marker>

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})