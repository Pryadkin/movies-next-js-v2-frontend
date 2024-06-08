import {RootState} from "@/redux/store/rootReducer"

export const getSelectTotalResults = (state: RootState) => state.searchReducer.totalResults
export const getSelectTotalPage = (state: RootState) => state.searchReducer.totalPages
export const getSelectMovieName = (state: RootState) => state.searchReducer.movieName
export const getSelectTvName = (state: RootState) => state.searchReducer.tvName
export const getSelectPage = (state: RootState) => state.searchReducer.page
export const getSelectTotalPages = (state: RootState) => state.searchReducer.totalPages
export const getSelectMoviesName = (state: RootState) => state.searchReducer.movieName
export const getSelectPersonName = (state: RootState) => state.searchReducer.personName
export const getSelectMovieType = (state: RootState) => state.searchReducer.movieType
