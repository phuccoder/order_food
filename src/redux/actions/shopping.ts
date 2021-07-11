import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { FoodAvailability, FoodModel, OfferModel } from '../models'

export interface AvailabilityAction {
    readonly type: 'ON_AVAILABILITY'
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: 'ON_FOODS_SEARCH'
    payload: [FoodModel]
}

export interface ShoppingErrorAction {
    readonly type: 'ON_SHOPPING_ERROR'
    payload: any
}

export interface OfferSearchAction {
    readonly type: 'ON_GET_OFFER'
    payload: [OfferModel]
}

export interface ApplyOrRemoveOfferAction {
    readonly type: 'ON_APPLY_OFFER' | 'ON_REMOVE_OFFER'
    payload: OfferModel
}

export type ShoppingAction = 
    AvailabilityAction | 
    ShoppingErrorAction | 
    FoodSearchAction |
    OfferSearchAction |
    ApplyOrRemoveOfferAction

export const onAvailability = (postCode: string) => {
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/${postCode}`)
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = (postCode: string) => {
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/${postCode}`)
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Search error'
                })
            } else {
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onGetOffers = (postCode: string) => {
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<[OfferModel]>(`${BASE_URL}food/offers/${postCode}`)
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Get offer error'
                })
            } else {
                dispatch({
                    type: 'ON_GET_OFFER',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onApplyOffer = (item: OfferModel, isRemove: boolean) => {
    return async ( dispatch: Dispatch<ShoppingAction> ) => {
        if (isRemove) {
            dispatch({
                type: 'ON_REMOVE_OFFER',
                payload: item
            })
            console.log('REMOVE OFFER OK')
        } else {
            dispatch({
                type: 'ON_APPLY_OFFER',
                payload: item
            })
            console.log('APPLY OFFER OK')
        }
    }

}


