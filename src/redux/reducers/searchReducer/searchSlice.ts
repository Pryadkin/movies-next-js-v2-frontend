import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {TMovieType} from '@/types'

import {initialState} from './searchState'

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload
        },
        setTotalResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload
        },
        setMovieName(state, action: PayloadAction<string>) {
            state.movieName = action.payload
        },
        setPersonName(state, action: PayloadAction<string>) {
            state.personName = action.payload
        },
        setTvName(state, action: PayloadAction<string>) {
            state.tvName = action.payload
        },
        setMovieType(state, action: PayloadAction<TMovieType>) {
            state.movieType = action.payload
        },
    },
})

export const searchReducer = searchSlice.reducer

export const {
    setMovieName,
    setPersonName,
    setTvName,
    setPage,
    setTotalPages,
    setTotalResults,
    setMovieType,
} = searchSlice.actions
