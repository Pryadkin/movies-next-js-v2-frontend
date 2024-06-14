import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {TGender, TPersonKnownDepartment} from '@/api/apiTypes/requestPerson'

import {initialState} from './profilePersonState'

const profilePersonSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPopularitySort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.popularitySort = action.payload
        },

        setGenderFilter(state, action: PayloadAction<TGender>) {
            state.genderFilter = action.payload
        },

        setKnownDepartmentFilter(state, action: PayloadAction<TPersonKnownDepartment>) {
            state.knownDepartmentFilter = action.payload
        },
    },
})

export const profilePersonReducer = profilePersonSlice.reducer

export const {
    setPopularitySort,
    setGenderFilter,
    setKnownDepartmentFilter,
} = profilePersonSlice.actions
