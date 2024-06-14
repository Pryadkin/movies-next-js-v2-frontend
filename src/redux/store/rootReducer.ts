import {useDispatch} from 'react-redux'

import {combineReducers} from '@reduxjs/toolkit'

import {
    searchReducer,
    profileReducer,
    layoutReducer,
} from '../reducers'
import {profilePersonReducer} from '../reducers/profilePersonReducer/profilePersonSlice'

import {store} from './store'

const rootReducer = combineReducers({
    searchReducer,
    profileReducer,
    profilePersonReducer,
    layoutReducer
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default rootReducer
