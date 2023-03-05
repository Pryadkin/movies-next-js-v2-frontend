import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {IMovie} from '@/api/apiTypes/requestMovies'

import {initialState} from './proflieState'

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setMovie(state, action: PayloadAction<IMovie>) {
            state.myMovies.push(action.payload)
        },
        setProfileMovies(state, action: PayloadAction<IMovie[]>) {
            state.myMovies = action.payload
        }
    },
})

export const profileReducer = profileSlice.reducer

export const {
    setMovie,
    setProfileMovies,
} = profileSlice.actions
