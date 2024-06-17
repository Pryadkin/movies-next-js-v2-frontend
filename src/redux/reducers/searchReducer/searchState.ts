import {TLanguage, TMovieType} from "@/types"
export interface State {
    movieName: string,
    personName: string,
    tvName: string,
    page: number,
    totalPages: number | null,
    totalResults: number | null,
    language: TLanguage,
    movieType: TMovieType,
}

export const initialState: State = {
    movieName: '',
    personName: '',
    tvName: '',
    page: 1,
    totalPages: null,
    totalResults: null,
    language: 'ru-RU',
    movieType: 'multi',
}
