import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {IResponseMovies} from '@/pages/api/apiTypes/requestMovies'

import {initialState} from './searchState'

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<IResponseMovies>) {
            state.movies = action.payload.results
            state.page = action.payload.page
            state.totalPages = action.payload.total_pages
            state.totalResults = action.payload.total_results
        },
        setMovieName(state, action: PayloadAction<string>) {
            state.movieName = action.payload
        }
    },
})

export const searchReducer = searchSlice.reducer

export const {
    setMovies,
    setMovieName,
} = searchSlice.actions
