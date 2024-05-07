/* eslint-disable init-declarations */
import {createSelector} from "@reduxjs/toolkit"
import dayjs from "dayjs"

import {RootState} from "@/redux/store/rootReducer"
import {TSortItem} from "@/types"

export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies

export const getSelectIsDrawerMovieTagsOpen = (state: RootState) => state.profileReducer.isDrawerMovieTagsOpen

export const getSelectTags = (state: RootState) => state.profileReducer.tags
export const getSelectSelTags = (state: RootState) => state.profileReducer.selectTags
export const getSelectSelIgnoreTags = (state: RootState) => state.profileReducer.selectIgnoreTags

export const getSelectGenres = (state: RootState) => state.profileReducer.selectGenres
export const getSelectIgnoreGenres = (state: RootState) => state.profileReducer.selectIgnoreGenres
export const getSelectSortItem = (state: RootState) => state.profileReducer.sortItem
export const getSelectGenreFlagStatus = (state: RootState) => state.profileReducer.genreFlagStatus
export const getSelectSearchMovie = (state: RootState) => state.profileReducer.searchMovie
export const getSelectMovieIsWithoutDateInBack = (state: RootState) => state.profileReducer.isWithoutDateInBack

export const getSortedMovies = createSelector(
    getSelectMyMovies,
    getSelectSortItem,
    (movies, sortItem) => {
        const getSorted = (
            a: string,
            b: string,
            sortType: string
        ) => {
            const updateLastA = dayjs(a)
                .valueOf()
            const updateLastB = dayjs(b)
                .valueOf()

            return sortType.slice(0 , 3) === 'asc' ? updateLastB - updateLastA : updateLastA - updateLastB
        }
        const getSort = (sortType: TSortItem) => {
            return [...movies].sort((a, b) => {
                if (sortType.slice(-11) === 'ReleaseDate') {
                    const lastDateA = a.release_date
                    const lastDateB = b.release_date

                    return getSorted(lastDateA, lastDateB, sortType)
                } else {
                    const lastDateA = a.settings.dateViewing.slice(-1)[0]
                    const lastDateB = b.settings.dateViewing.slice(-1)[0]

                    return getSorted(lastDateA, lastDateB, sortType)
                }
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
        const isExact = false

        for (let i = 0; i < tags.length; i++) {
            let isExist = null
            filteredMovies = filteredMovies.filter(movie => {
                const findMovie = movie.settings?.tags.find(tag => tag.tagName === tags[i].tagName)

                return findMovie
            })
            if (!isExact && isExist) break
        }

        for (let i = 0; i < ignoreTags.length; i++) {
            filteredMovies = filteredMovies.filter(movie => {
                return !movie.settings.tags.find(tag => tag.tagName === ignoreTags[i].tagName)
            })
        }

        for (let i = 0; i < selectGenres.length; i++) {
            if (selectGenres[i].id === 0) {
                filteredMovies = filteredMovies.filter(movie => {
                    return movie.settings.isTv
                })
            }

            filteredMovies = filteredMovies.filter(movie => {
                return movie.genre_ids.find(genreId => {
                    if (selectGenres[i].id !== 0) {
                        return genreId === selectGenres[i].id
                    }
                    return true
                })
            })
        }

        for (let i = 0; i < selectIgnoreGenres.length; i++) {
            if (selectIgnoreGenres[i].id === 0) {
                filteredMovies = filteredMovies.filter(movie => {
                    return !movie.settings.isTv
                })
            }

            filteredMovies = filteredMovies.filter(movie => {
                return !movie.genre_ids.find(genreId => {
                    if (selectIgnoreGenres[i].id !== 0) {
                        return genreId === selectIgnoreGenres[i].id
                    }
                    return false
                })
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