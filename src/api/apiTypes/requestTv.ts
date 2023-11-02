export interface IResponseTv {
    page: number,
    results: ITv[],
    total_pages: number,
    total_results: number,
}

export interface IRequestTv {
    api_key: string
    query: string
    page: string
    language: string
    include_adult: boolean
    region?: string
    year?: number
    primary_release_year?: number
}

export interface ITv {
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
    poster_path: string,
    vote_average: number,
    vote_count: number,
    settings: {
        tags: {
            tagName: string,
            color: string,
        }[],
        dateAdd: string,
        dateViewing: string[],
        isTv: boolean,
    }
}

// export type TMovieEn = Omit<
// ITvLang,
// 'poster_path_ru' |
// 'backdrop_path_ru' |
// 'name_ru' |
// 'overview_ru'
// >

// export type TMovieRu = Omit<
// ITvLang,
// 'poster_path_en' |
// 'backdrop_path_en' |
// 'name_en' |
// 'overview_en'
// >