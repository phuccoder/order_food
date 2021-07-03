import { combineReducers } from 'redux'
import { shoppingReducer } from './shopping'
import { userReducer } from './user'

export const rootReducer = combineReducers({
    userReducer: userReducer,
    shoppingReducer: shoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>