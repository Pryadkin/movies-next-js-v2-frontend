import {IMultiMovie} from "./requestMovies"

export interface IResponsePopular {
    page: number
    results: IPopular[]
    total_pages: number
    total_results: number
}

export interface IPopular {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: IMultiMovie[]
}

// export interface IMultiMovie {
//     adult: boolean
//     backdrop_path: string
//     id: number
//     title: string
//     original_language: string
//     original_title: string
//     overview: string
//     poster_path: string
//     media_type: string
//     genre_ids: number[]
//     popularity: number
//     release_date: string
//     video: boolean
//     vote_average: number
//     vote_count: number
// }
