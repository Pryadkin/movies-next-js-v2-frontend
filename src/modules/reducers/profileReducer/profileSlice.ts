import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {IMovie, IResponseMovies} from '@/pages/api/apiTypes/requestMovies'

import {initialState} from './proflieState'

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setMovie(state, action: PayloadAction<IMovie>) {
            state.myMovies.push(action.payload)
        },
    },
})

export const profileReducer = profileSlice.reducer

export const {
    setMovie,
} = profileSlice.actions
