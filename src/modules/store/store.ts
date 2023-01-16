import {useDispatch} from 'react-redux'

import {configureStore} from '@reduxjs/toolkit'
import type {Action} from '@reduxjs/toolkit'
import type {ThunkAction} from 'redux-thunk'

import rootReducer from './rootReducer'
import type {RootState} from './rootReducer'

export const store = configureStore({
    reducer: rootReducer,
})

export type ReduxStore = typeof store

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useAppDispatch: () => AppDispatch = useDispatch
