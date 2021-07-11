import React, { FC } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { OfferModel } from '../redux'

interface OfferCardProps { 
    item: OfferModel
    onTapApply: Function
    onTapRemove: Function
    isApplied: boolean
}

export const OfferCard: FC<OfferCardProps> = ({ item, onTapApply, onTapRemove, isApplied }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: `${item.images[0]}`}} 
                style={{ 
                    width: Dimensions.get('screen').width - 20, 
                    height: 200,
                    borderRadius: 20, 
                    backgroundColor: '#EAEAEA'
                }}
            /> 
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ display: 'flex', flex: 5, padding: 10}}>
                    <Text style={{ fontSize: 14, fontWeight: '700', padding: 5 }}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, padding: 5 }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ display: 'flex', flex: 3, padding: 20, paddingTop: 30 }}>
                    {isApplied ?
                        <TouchableOpacity 
                            onPress={() => onTapRemove(item)}
                            style={ [styles.applyPromo, { backgroundColor: '#ff4673' }] }
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                        
                    :
                        <TouchableOpacity 
                            style={styles.applyPromo}
                            onPress={() => onTapApply(item)}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                Apply
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'blue' }}>
                                {` ${item.promoCode}`}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View> 
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
        backgroundColor: '#efca5f',
        height: 300,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'column'
    },
    applyPromo: {
        flexDirection: 'row',
        backgroundColor: '#8fc777',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})