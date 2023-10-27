import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {TLanguage} from '@/types'

import {initialState} from './layoutState'

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<TLanguage>) {
            state.language = action.payload
        },
        sestIsModalDetailsOpen(state, action: PayloadAction<boolean>) {
            state.isModalDetailsOpen = action.payload
        }
    },
})

export const layoutReducer = layoutSlice.reducer

export const {
    setLanguage,
    sestIsModalDetailsOpen,
} = layoutSlice.actions
