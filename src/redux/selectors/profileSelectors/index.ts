/* eslint-disable init-declarations */
import {createSelector} from "@reduxjs/toolkit"
import dayjs from "dayjs"

import {RootState} from "@/redux/store/rootReducer"
import {TSortItem} from "@/types"

export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies

export const getSelectIsDrawerMovieTagsOpen = (state: RootState) => state.profileReducer.isDrawerMovieTagsOpen

export const getSelectMovie = (state: RootState) => state.profileReducer.selectMovie

export const getSelectTags = (state: RootState) => state.profileReducer.tags
export const getSelectEnableFilters = (state: RootState) => state.profileReducer.enableFilters

export const getSelectGenres = (state: RootState) => state.profileReducer.selectGenres
export const getSelectDateViewing = (state: RootState) => state.profileReducer.selectMovie?.settings.dateViewing
export const getSelectSortItem = (state: RootState) => state.profileReducer.sortItem

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
    getSelectEnableFilters,
    getSelectGenres,
    getSortedMovies,
    (filters, selectGenres, sortedMovies) => {
        let filteredMovies = sortedMovies

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

        return filters.length || selectGenres.length ? filteredMovies : sortedMovies
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