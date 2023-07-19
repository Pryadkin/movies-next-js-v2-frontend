import {IMovie} from "@/api/apiTypes/requestMovies"

export interface State {
    movieName: string,
    movies: IMovie[],
    page: number,
    totalPages: number | null,
    totalResults: number | null,
}

export const initialState: State = {
    movieName: '',
    movies: [],
    page: 1,
    totalPages: null,
    totalResults: null,
}
