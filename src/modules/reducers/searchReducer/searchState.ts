import {ISearchMoviesResults} from "@/pages/api/apiTypes/requestMovies"

export interface State {
    movies: ISearchMoviesResults[]
}

export const initialState: State = {
    movies: [],
}
