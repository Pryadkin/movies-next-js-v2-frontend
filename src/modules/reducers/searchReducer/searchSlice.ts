import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {ISearchMoviesResults} from '@/pages/api/apiTypes/requestMovies'

import {initialState} from './searchState'

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<any>) {
            state.movies = action.payload
        },
    },
})

export const searchReducer = searchSlice.reducer

export const {
    setMovies,
} = searchSlice.actions
