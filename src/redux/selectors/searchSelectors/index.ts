import {RootState} from "@/redux/store/rootReducer"


export const getSelectMovies = (state: RootState) => state.searchReducer.movies
export const getSelectTotalPages = (state: RootState) => state.searchReducer.totalPages
export const getSelectMoviesName = (state: RootState) => state.searchReducer.movieName
