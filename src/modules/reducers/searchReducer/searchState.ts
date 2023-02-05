import {IMovie} from "@/pages/api/apiTypes/requestMovies"

export interface State {
    movieName: string,
    movies: IMovie[],
    page: number | null,
    totalPages: number | null,
    totalResults: number | null,
}

export const initialState: State = {
    movieName: '',
    movies: [],
    page: null,
    totalPages: null,
    totalResults: null,
}
