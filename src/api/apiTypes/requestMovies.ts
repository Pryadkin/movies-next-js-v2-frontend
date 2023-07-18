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
    poster_path: string | null
    adult: boolean
    backdrop_path: string | null
    original_language: string
    original_title: string
    genre_ids: Array<number>
    title: string
    vote_average: number
    overview: string
    release_date: string
    filters: {
        id: number,
        name: string,
        path: string
    }[] | null
}

export interface IErrorResponse {
    error: string,
    message: string,
    statusCode: number,
}