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
        },
        setIsAddMovieModalOpen(state, action: PayloadAction<boolean>) {
            state.isAddMovieModalOpen = action.payload
        },
        setArtistId(state, action: PayloadAction<number | null>) {
            state.artistId = action.payload
        },
        setMovieToModelContent(state, action: PayloadAction<number | null>) {
            state.modelContent.movieId = action.payload
        },
        setArtistToModelContent(state, action: PayloadAction<number | null>) {
            state.modelContent.artistId = action.payload
        },
    },
})

export const layoutReducer = layoutSlice.reducer

export const {
    setLanguage,
    sestIsModalDetailsOpen,
    setIsAddMovieModalOpen,
    setArtistId,
    setMovieToModelContent,
    setArtistToModelContent,
} = layoutSlice.actions
