export interface IResponseMovies {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}

export interface IRequestMovies {
    api_key: string
    query: string
    page: string
    language: string
    include_adult: boolean
    region?: string
    year?: number
    primary_release_year?: number
}

export interface IMovie {
    id: number
    popularity: number
    vote_count: number
    video: false
    poster_path: string
    adult: boolean
    backdrop_path: string | null
    original_language: string
    original_title: string
    genre_ids: Array<number>
    title: string
    vote_average: number
    overview: string
    release_date: string
    settings: {
        tags: {
            tagName: string,
            color: string,
        }[],
        dateAdd: string,
        dateViewing: string[]
    }
}

export interface ITV {
    adult: boolean,
    backdrop_path: string,
    first_air_date: string,
    genre_ids: number[]
    id: number,
    name: string,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: number,
    vote_average: number,
    vote_count: number,
    settings: {
        tags: {
            tagName: string,
            color: string,
        }[],
        dateAdd: string,
        dateViewing: string[]
    }
}

export interface IMovieLang {
    id: number
    popularity: number
    vote_count: number
    video: false
    poster_path_en: string
    poster_path_ru: string
    adult: boolean
    backdrop_path_en: string | null
    backdrop_path_ru: string | null
    original_language: string
    original_title: string
    genre_ids: Array<number>
    title_en: string | null
    title_ru: string | null
    vote_average: number
    overview_en: string | null
    overview_ru: string | null
    release_date: string
    settings: {
        tags: {
            tagName: string,
            color: string,
        }[],
        dateAdd: string,
        dateViewing: string[]
    }
}

export type TMovieEn = Omit<
IMovieLang,
'poster_path_ru' |
'backdrop_path_ru' |
'title_ru' |
'overview_ru'
>

export type TMovieRu = Omit<
IMovieLang,
'poster_path_en' |
'backdrop_path_en' |
'title_en' |
'overview_en'
>

export interface IErrorResponse {
    error: string,
    message: string,
    statusCode: number,
}