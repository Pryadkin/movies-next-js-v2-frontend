import {createSelector} from "@reduxjs/toolkit"

import {RootState} from "@/redux/store/rootReducer"

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
export const getSelectMovieIsWithDateOfViewing = (state: RootState) => state.profileReducer.isWithDateOfViewing
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