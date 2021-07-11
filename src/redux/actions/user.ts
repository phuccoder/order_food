import axios from 'axios'
import { Address } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import AsyncStorage from '@react-native-community/async-storage'

import { 
    FoodModel, 
    UserModel, 
    OrderModel 
} from '../models'

export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION'
    payload: Address
}

export interface ExecuteError {
    readonly type: 'ON_EXECUTE_ERROR'
    payload: any
}

export interface UpdateCartAction {
    readonly type: 'ON_UPDATE_CART'
    payload: FoodModel
}

export interface UserLoginAction {
    readonly type: 'ON_USER_LOGIN'
    payload: UserModel
}

export interface CreateOrderAction {
    readonly type: 'ON_CREATE_ORDER'
    payload: OrderModel
}

export interface ViewOrderAction {
    readonly type: 'ON_VIEW_ORDER' | 'ON_CANCEL_ORDER'
    payload: [OrderModel]
}

export interface UserLogoutAction {
    readonly type: 'ON_USER_LOGOUT'
    payload: any
}

export type UserAction = 
    UpdateLocationAction | 
    ExecuteError | 
    UpdateCartAction | 
    UserLoginAction | 
    CreateOrderAction |
    ViewOrderAction |
    UserLogoutAction

export const onUpdateLocation = (location: Address) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const locationParseToString = JSON.stringify(location)
            // save location in local storage
            await AsyncStorage.setItem('user_location', locationParseToString)
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })
            console.log('UPDATE LOCATION OK')
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('UPDATE LOCATION FAILED')
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
        console.log('UPDATE CART OK')
    }
}

export const OnUserLogin = (email: string, password: string) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
                email,
                password
            })
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'LOGIN FAILED'
                })
                console.log('LOGIN INCORRECT')
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
                console.log('LOGIN OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('LOGIN FAILED')
        }
    }
}

export const OnUserSignUp = (email: string, phone: string, password: string) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/create-account`, {
                email,
                phone,
                password
            })
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'SIGN UP INCORRECT'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
                console.log('SIGN UP OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('SIGN UP FAILED')
        }
    }
}

export const onVerifyOtp = (otp: string, user: UserModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, { otp })
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'VERIFY ERROR'
                })
                console.log('INCORRECT OTP')
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
                console.log('VERIFIED')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('VERIFY FAILED')
        }
    }
}

export const onOtpRequest = (user: UserModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<UserModel>(`${BASE_URL}user/otp`)
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'REQUEST INCORRECT'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
                console.log('REQUEST OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('REQUEST FAILED')
        }
    }
}

export const onCreateOrder = (cartItem: [FoodModel], user: UserModel) => {
    let cart = new Array()
    cartItem.map((item) => {
        cart.push({ _id: item._id, unit: item.unit })
    })
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.post<OrderModel>(`${BASE_URL}user/create-order`, { cart })
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'CREATE ORDER ERROR'
                })
                console.log('CREATE ORDER ERROR')
            } else {
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.data
                })
                console.log('CREATE ORDER OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('CREATE ORDER FAILED')
        }
    }
}

export const onGetOrder = (user: UserModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            // return bunch of order
            const response = await axios.get<[OrderModel]>(`${BASE_URL}user/order`)
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'GET ORDER ERROR'
                })
                console.log('GET ORDER INCORRECT')
            } else {
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.data
                })
                console.log('GET ORDER OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('GET ORDER FAILED')
        }
    }
}

export const onCancelOrder = (order: OrderModel, user: UserModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            // Return bunch of order
            const response = await axios.delete<[OrderModel]>(`${BASE_URL}user/order/${order._id}`)
            if (!response) {
                dispatch({
                    type: 'ON_EXECUTE_ERROR',
                    payload: 'CANCEL ORDER ERROR'
                })
                console.log('CANCEL ORDER INCORRECT ')
            } else {
                dispatch({
                    type: 'ON_CANCEL_ORDER',
                    payload: response.data
                })
                console.log('CANCEL ORDER OK')
            }
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('CANCEL ORDER FAILED')
        }
    }
}

export const onUserLogout = () => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
                dispatch({
                    type: 'ON_USER_LOGOUT',
                    payload: undefined
                })
                console.log('LOGOUT OK')
            
        } catch (error) {
            dispatch({
                type: 'ON_EXECUTE_ERROR',
                payload: error
            })
            console.log('LOGOUT FAILED')
        }
    }
}