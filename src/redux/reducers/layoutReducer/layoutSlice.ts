import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {TLanguage} from '@/types'

import {initialState} from './layoutState'

interface IModelContant {
    type: 'movie' | 'artist' | 'tv',
    id: number
}

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
        setModelContent(state, action: PayloadAction<IModelContant>) {
            state.modelContent.push(action.payload)
        },
        deleteModelContent(state) {
            state.modelContent.pop()
        },
        deleteAllModelContent(state) {
            state.modelContent = []
        },
    },
})

export const layoutReducer = layoutSlice.reducer

export const {
    setLanguage,
    sestIsModalDetailsOpen,
    setIsAddMovieModalOpen,
    setArtistId,
    setModelContent,
    deleteModelContent,
    deleteAllModelContent,
} = layoutSlice.actions
