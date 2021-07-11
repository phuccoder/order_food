import React, { FC } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View } from 'react-native'

export interface MapCustomProps {
    width: number
    height: number
}

export const MapCustom: FC<MapCustomProps> = ({ width, height }) => {
    return (
        <View style={styles.container}>
            <MapView 
                style={{ width: width, height: height, borderRadius: 5 }}
                
                showsUserLocation
                showsMyLocationButton
                provider='google'
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.45,
                    longitudeDelta: 0.05,
                }}
            />
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