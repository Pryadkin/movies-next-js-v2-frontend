import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {initialState} from './profilePersonState'

const profilePersonSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPopularitySort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.popularitySort = action.payload
        },
    },
})

export const profilePersonReducer = profilePersonSlice.reducer

export const {
    setPopularitySort
} = profilePersonSlice.actions
