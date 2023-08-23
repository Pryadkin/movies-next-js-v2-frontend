import {IMovie} from "@/api/apiTypes/requestMovies"
import {TLanguage, TMovieType} from "@/types"
export interface State {
    movieName: string,
    tvName: string,
    movies: IMovie[],
    page: number,
    totalPages: number | null,
    totalResults: number | null,
    language: TLanguage,
    movieType: TMovieType,
}

export const initialState: State = {
    movieName: '',
    tvName: '',
    movies: [],
    page: 1,
    totalPages: null,
    totalResults: null,
    language: 'ru-RU',
    movieType: 'movie',
}
