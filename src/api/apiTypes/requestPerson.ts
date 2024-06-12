import {ICorrectMovieWithoutLang} from "./requestMovies"

export interface IRequestPerson {
    page: number,
    results: IPerson[],
    total_pages: number,
    total_results: number,
}

type TMoviesWithoutSettings = Omit<ICorrectMovieWithoutLang, 'settings'>

export interface IPerson {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: TMoviesWithoutSettings[]
}

export type TPersonState = IPersonWithoutLang | IPersonWithLang

export interface IPersonWithoutLang {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: TMoviesWithoutSettings[]
    settings: {
        tags: string[]
    }
}

export interface IPersonWithLang {
    adult: boolean
    gender: number
    id: number
    known_for_department: 'Acting' | 'Directior'
    name_ru: string
    name_en: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: TMoviesWithoutSettings[]
}

// export interface IKnownFor {
//     backdrop_path: string
//     id: number
//     original_title: string
//     overview: string
//     poster_path: string
//     media_type: string
//     adult: boolean
//     title: string
//     original_language: string
//     genre_ids: number[]
//     popularity: number
//     release_date: string
//     video: boolean
//     vote_average: number
//     vote_count: number
// }