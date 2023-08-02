import {createSlice, current} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {DrawerProps} from 'antd'

import {IMovieLang} from '@/api/apiTypes/requestMovies'
import {IGenre, ITag, TSortItem} from '@/types'

import {initialState} from './proflieState'

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setMovie(state, action: PayloadAction<IMovieLang>) {
            state.myMovies.push(action.payload)
        },
        deleteMovie(state, action: PayloadAction<number>) {
            const removeMovie = state.myMovies.filter(movie => movie.id !== action.payload)
            state.myMovies = removeMovie
        },
        setProfileMovies(state, action: PayloadAction<IMovieLang[]>) {
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
        deleteTagFromMovie(state, action: PayloadAction<ITag>) {
            const updateTags = state.selectMovie?.settings.tags.filter(tag => tag.tagName !== action.payload.tagName)

            if (state.selectMovie && updateTags) {
                state.selectMovie.settings.tags = updateTags
            }
        },
        deleteTagFromMovies(state, action: PayloadAction<string>) {
            const updateMovies = state.myMovies.map(movie => {
                return {
                    ...movie,
                    settings: {
                        ...movie.settings,
                        tags: movie.settings.tags.filter(tag => tag.tagName !== action.payload),
                    }
                }
            })

            state.myMovies = updateMovies
        },
        updateMovie(state, action: PayloadAction<IMovieLang>) {
            const updateMovie = state.myMovies.map(movie => {
                if (movie.id === action.payload.id) return action.payload
                return movie
            })
            state.myMovies = updateMovie
        },
        updateTags(state, action: PayloadAction<ITag[]>) {
            state.tags = action.payload
        },
        addSelectTags(state, action: PayloadAction<ITag>) {
            state.selectTags.push(action.payload)
        },
        addSelectIgnoreTags(state, action: PayloadAction<ITag>) {
            state.selectIgnoreTags.push(action.payload)
        },
        removeSelectTags(state, action: PayloadAction<ITag>) {
            const updateGenres = state.selectTags.filter(genre => genre.tagName !== action.payload.tagName)

            state.selectTags = updateGenres
        },
        removeSelectIgnoreTags(state, action: PayloadAction<ITag>) {
            const updateFilters = state.selectIgnoreTags.filter(filt => filt.tagName !== action.payload.tagName)

            state.selectIgnoreTags = updateFilters
        },
        setSortMovies(state, action: PayloadAction<TSortItem>) {
            state.sortItem = action.payload
        },
        getGenres(state, action: PayloadAction<IGenre[]>) {
            state.genres = action.payload
        },
        addSelectGenres(state, action: PayloadAction<IGenre>) {
            state.selectGenres.push(action.payload)
        },
        removeSelectGenres(state, action: PayloadAction<IGenre>) {
            const updateGenres = state.selectGenres.filter(genre => genre.id !== action.payload.id)

            state.selectGenres = updateGenres
        },
        addSelectIgnoreGenres(state, action: PayloadAction<IGenre>) {
            state.selectIgnoreGenres.push(action.payload)
        },
        removeSelectIgnoreGenres(state, action: PayloadAction<IGenre>) {
            const updateGenres = state.selectIgnoreGenres.filter(genre => genre.id !== action.payload.id)

            state.selectIgnoreGenres = updateGenres
        },
        updateMovieDateViewing(state, action: PayloadAction<string[]>) {
            if (state.selectMovie) {
                state.selectMovie.settings.dateViewing = action.payload
            }
        },
        addMovieDateViewing(state, action: PayloadAction<string>) {
            state.selectMovie?.settings.dateViewing.push(action.payload)
        },
        deleteMovieDateViewing(state, action: PayloadAction<string>) {
            const filteredDate = state.selectMovie?.settings.dateViewing.filter(date => date !== action.payload)

            if (state.selectMovie) {
                const updateMovie = {
                    ...state.selectMovie,
                    settings: {
                        ...state.selectMovie.settings,
                        dateViewing: filteredDate || []
                    }
                }

                state.selectMovie = updateMovie
            }
        },
        setGenreFlagStatus(state, action: PayloadAction<boolean>) {
            state.genreFlagStatus = action.payload
        }
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
    deleteTagFromMovie,
    deleteTagFromMovies,
    updateTags,
    addSelectTags,
    removeSelectTags,
    addSelectIgnoreTags,
    removeSelectIgnoreTags,
    setSortMovies,
    getGenres,
    setGenreFlagStatus,
    addSelectGenres,
    addSelectIgnoreGenres,
    removeSelectGenres,
    removeSelectIgnoreGenres,
    updateMovieDateViewing,
    addMovieDateViewing,
    deleteMovieDateViewing,
} = profileSlice.actions
