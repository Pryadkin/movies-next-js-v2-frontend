import {RootState} from "@/redux/store/rootReducer"


export const getSelectMovies = (state: RootState) => state.searchReducer.movies
export const getSelectMovieName = (state: RootState) => state.searchReducer.movieName
export const getSelectPage = (state: RootState) => state.searchReducer.page
export const getSelectTotalPages = (state: RootState) => state.searchReducer.totalPages
export const getSelectMoviesName = (state: RootState) => state.searchReducer.movieName
