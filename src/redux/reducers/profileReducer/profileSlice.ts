import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {DrawerProps} from 'antd'

import {IMovie} from '@/api/apiTypes/requestMovies'

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
        }
    },
})

export const profileReducer = profileSlice.reducer

export const {
    setMovie,
    deleteMovie,
    setProfileMovies,
    getIsDrawerMovieTagsOpen,
} = profileSlice.actions
