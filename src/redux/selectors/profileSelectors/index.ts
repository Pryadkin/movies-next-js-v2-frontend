/* eslint-disable init-declarations */
import {createSelector} from "@reduxjs/toolkit"

import {RootState} from "@/redux/store/rootReducer"

export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies

export const getSelectIsDrawerMovieTagsOpen = (state: RootState) => state.profileReducer.isDrawerMovieTagsOpen

export const getSelectMovie = (state: RootState) => state.profileReducer.selectMovie

export const getSelectTags = (state: RootState) => state.profileReducer.tags
export const getSelectEnableFilters = (state: RootState) => state.profileReducer.enableFilters

export const getFilteredMovies = createSelector(
    (state: RootState) => state.profileReducer.enableFilters,
    (state: RootState) => state.profileReducer.myMovies,
    (filters, movies) => {
        let filteredMovies = movies

        for (let i = 0; i < filters.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.settings.tags.includes(filters[i])
            })
        }

        return filters.length ? filteredMovies : movies
    }
)

export const getSelectTagsForAntSelect = createSelector(
    getSelectTags,
    tags => {
        const updateTags = tags.map(tag => {
            return ({
                value: tag,
                label: tag
            })
        })

        return [
            {value: '', label: ''},
            ...updateTags
        ]
    }
)