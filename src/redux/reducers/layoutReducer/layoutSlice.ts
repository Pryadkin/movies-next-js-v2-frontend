import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {IPerson} from '@/api/apiTypes/requestPerson'
import {IArtistDetails} from '@/api/apiTypes/responseArtistDetails'
import {ITag, TLanguage} from '@/types'

import {IPersonDetailsWithLang} from './../../../api/apiTypes/responseArtistDetails'
import {initialState} from './layoutState'

interface IModelContant {
    type: 'movie' | 'artist' | 'tv',
    id: number
}

export interface IUpdateDate {
    oldDate: string,
    newDate: string
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
        setIsAddPersonModalOpen(state, action: PayloadAction<boolean>) {
            state.isAddPersonModalOpen = action.payload
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
        setSelectMovie(state, action: PayloadAction<
        ICorrectMovieWithLang
        | ICorrectMovieWithoutLang
        | null
        >) {
            state.selectMovie = action.payload
        },
        setSelectPerson(state, action: PayloadAction<IArtistDetails | IPersonDetailsWithLang | IPerson | null
        >) {
            state.selectPerson = action.payload
        },
        setTagToSelectMovie(state, action: PayloadAction<ITag>) {
            state.selectMovie?.settings?.tags.push(action.payload)
        },
        deleteTagFromMovie(state, action: PayloadAction<ITag>) {
            const updateTags = state.selectMovie?.settings.tags.filter(tag => tag.tagName !== action.payload.tagName)

            if (state.selectMovie && updateTags) {
                state.selectMovie.settings.tags = updateTags
            }
        },
        updateMovieDateViewing(state, action: PayloadAction<IUpdateDate>) {
            const {oldDate, newDate} = action.payload
            const dateViewings = state.selectMovie?.settings.dateViewing
            const updateDate = dateViewings?.map(date => {
                if (date === oldDate) {
                    return newDate
                }
                return date
            })

            if (state.selectMovie && updateDate) {
                state.selectMovie.settings.dateViewing = updateDate
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
    },
})

export const layoutReducer = layoutSlice.reducer

export const {
    setLanguage,
    sestIsModalDetailsOpen,
    setIsAddPersonModalOpen,
    setIsAddMovieModalOpen,
    setArtistId,
    setModelContent,
    deleteModelContent,
    deleteAllModelContent,
    setSelectMovie,
    setSelectPerson,
    setTagToSelectMovie,
    deleteTagFromMovie,
    updateMovieDateViewing,
    addMovieDateViewing,
    deleteMovieDateViewing,
} = layoutSlice.actions
