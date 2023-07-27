import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {DrawerProps} from 'antd'

import {IMovie} from '@/api/apiTypes/requestMovies'
import {ITag} from '@/types'

import {initialState} from './proflieState'

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setMovie(state, action: PayloadAction<IMovie>) {
            state.myMovies.push(action.payload)
        },
        deleteMovie(state, action: PayloadAction<number>) {
            const removeMovie = state.myMovies.filter(movie => movie.id !== action.payload)
            state.myMovies = removeMovie
        },
        setProfileMovies(state, action: PayloadAction<IMovie[]>) {
            state.myMovies = action.payload
        },
        getIsDrawerMovieTagsOpen(state, action: PayloadAction<DrawerProps['open']>) {
            state.isDrawerMovieTagsOpen = action.payload
        },
        setSelectMovie(state, action: PayloadAction<number>) {
            const selectMovie = state.myMovies.find(movie => movie.id === action.payload)
            state.selectMovie = selectMovie
        },
        setTagToMovie(state, action: PayloadAction<ITag>) {
            state.selectMovie?.settings?.tags.push(action.payload)
        },
        deleteTagToMovie(state, action: PayloadAction<ITag>) {
            const updateTags = state.selectMovie?.settings.tags.filter(tag => tag.tagName !== action.payload.tagName)

            if (state.selectMovie && updateTags) {
                state.selectMovie.settings.tags = updateTags
            }
        },
        updateMovie(state, action: PayloadAction<IMovie>) {
            const updateMovie = state.myMovies.map(movie => {
                if (movie.id === action.payload.id) return action.payload
                return movie
            })
            state.myMovies = updateMovie
        },
        updateTags(state, action: PayloadAction<ITag[]>) {
            state.tags = action.payload
        },
        addEnableFilters(state, action: PayloadAction<ITag>) {
            state.enableFilters.push(action.payload)
        },
        removeEnableFilters(state, action: PayloadAction<ITag>) {
            const updateFilters = state.enableFilters.filter(filt => filt.tagName !== action.payload.tagName)

            state.enableFilters = updateFilters
        },
    },
})

export const profileReducer = profileSlice.reducer

export const {
    setMovie,
    deleteMovie,
    setProfileMovies,
    getIsDrawerMovieTagsOpen,
    setSelectMovie,
    setTagToMovie,
    updateMovie,
    deleteTagToMovie,
    updateTags,
    addEnableFilters,
    removeEnableFilters,
} = profileSlice.actions
