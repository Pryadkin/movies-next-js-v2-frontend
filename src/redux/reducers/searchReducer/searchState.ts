import {IMovie} from "@/api/apiTypes/requestMovies"

type TLanguage = 'ru-RU' | 'en-EN'
export interface State {
    movieName: string,
    movies: IMovie[],
    page: number,
    totalPages: number | null,
    totalResults: number | null,
    language: TLanguage,
}

export const initialState: State = {
    movieName: '',
    movies: [],
    page: 1,
    totalPages: null,
    totalResults: null,
    language: 'ru-RU',
}
