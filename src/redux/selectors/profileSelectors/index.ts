/* eslint-disable init-declarations */
import {createSelector} from "@reduxjs/toolkit"

import {RootState} from "@/redux/store/rootReducer"

export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies

export const getSelectIsDrawerMovieTagsOpen = (state: RootState) => state.profileReducer.isDrawerMovieTagsOpen

export const getSelectMovie = (state: RootState) => state.profileReducer.selectMovie

export const getSelectTags = (state: RootState) => state.profileReducer.tags
export const getSelectEnableFilters = (state: RootState) => state.profileReducer.enableFilters

export const getSelectGenres = (state: RootState) => state.profileReducer.selectGenres

export const getFilteredMovies = createSelector(
    (state: RootState) => state.profileReducer.enableFilters,
    (state: RootState) => state.profileReducer.selectGenres,
    (state: RootState) => state.profileReducer.myMovies,
    (filters, selectGenres, movies) => {
        let filteredMovies = movies

        for (let i = 0; i < filters.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.settings.tags.find(tag => tag.tagName === filters[i].tagName)
            })
        }

        for (let i = 0; i < selectGenres.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.genre_ids.find(genreId => genreId === selectGenres[i].id)
            })
        }

        return filters.length || selectGenres.length ? filteredMovies : movies
    }
)

export const getSelectTagsForAntSelect = createSelector(
    getSelectTags,
    tags => {
        const updateTags = tags?.map(tag => {
            return ({
                value: tag.tagName,
                label: tag.tagName
            })
        })

        return updateTags
    }
)