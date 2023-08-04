/* eslint-disable init-declarations */
import {createSelector} from "@reduxjs/toolkit"
import dayjs from "dayjs"

import {RootState} from "@/redux/store/rootReducer"
import {TSortItem} from "@/types"

export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies

export const getSelectIsDrawerMovieTagsOpen = (state: RootState) => state.profileReducer.isDrawerMovieTagsOpen

export const getSelectMovie = (state: RootState) => state.profileReducer.selectMovie

export const getSelectTags = (state: RootState) => state.profileReducer.tags
export const getSelectSelTags = (state: RootState) => state.profileReducer.selectTags
export const getSelectSelIgnoreTags = (state: RootState) => state.profileReducer.selectIgnoreTags

export const getSelectGenres = (state: RootState) => state.profileReducer.selectGenres
export const getSelectIgnoreGenres = (state: RootState) => state.profileReducer.selectIgnoreGenres
export const getSelectDateViewing = (state: RootState) => state.profileReducer.selectMovie?.settings.dateViewing
export const getSelectSortItem = (state: RootState) => state.profileReducer.sortItem
export const getSelectGenreFlagStatus = (state: RootState) => state.profileReducer.genreFlagStatus
export const getSelectSearchMovie = (state: RootState) => state.profileReducer.searchMovie

export const getSortedMovies = createSelector(
    getSelectMyMovies,
    getSelectSortItem,
    (movies, sortItem) => {
        const getSort = (sortType: TSortItem) => {
            return [...movies].sort((a, b) => {
                const lastDateA = a.settings.dateViewing.slice(-1)[0]
                const lastDateB = b.settings.dateViewing.slice(-1)[0]

                const updateLastA = dayjs(lastDateA)
                    .valueOf()
                const updateLastB = dayjs(lastDateB)
                    .valueOf()

                return sortType === 'descDate' ? updateLastA - updateLastB : updateLastB - updateLastA
            })
        }

        return getSort(sortItem)
    }
)

export const getFilteredMovies = createSelector(
    getSelectSelTags,
    getSelectSelIgnoreTags,
    getSelectGenres,
    getSelectIgnoreGenres,
    getSortedMovies,
    (
        tags,
        ignoreTags,
        selectGenres,
        selectIgnoreGenres,
        sortedMovies
    ) => {
        let filteredMovies = sortedMovies

        for (let i = 0; i < tags.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.settings.tags.find(tag => tag.tagName === tags[i].tagName)
            })
        }

        for (let i = 0; i < ignoreTags.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return !movie.settings.tags.find(tag => tag.tagName === ignoreTags[i].tagName)
            })
        }

        for (let i = 0; i < selectGenres.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.genre_ids.find(genreId => genreId === selectGenres[i].id)
            })
        }

        for (let i = 0; i < selectIgnoreGenres.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return !movie.genre_ids.find(genreId => genreId === selectIgnoreGenres[i].id)
            })
        }

        return tags.length ||
        ignoreTags.length ||
        selectGenres.length ||
        selectIgnoreGenres.length
            ? filteredMovies
            : sortedMovies
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