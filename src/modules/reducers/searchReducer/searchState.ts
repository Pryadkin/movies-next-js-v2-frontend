import {ISearchMoviesResults} from "@/pages/api/apiTypes/requestMovies"

export interface State {
    movies: ISearchMoviesResults[],
    page: number | null,
    total_pages: number | null,
    total_results: number | null,
}

export const initialState: State = {
    movies: [],
    page: null,
    total_pages: null,
    total_results: null,
}
