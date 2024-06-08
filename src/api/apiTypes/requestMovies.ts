export interface IResponseMovies {
    page: number,
    results: IResponseSearchMovieResult[],
    total_pages: number,
    total_results: number,
}

export interface IResponseTv {
    page: number,
    results: IResponseSearchTvResult[],
    total_pages: number,
    total_results: number,
}

export interface IResponseMulti {
    page: number,
    results: IResponseSearchMultiResult[],
    total_pages: number,
    total_results: number,
}

export interface IResponseSearchResult {
    adult: boolean
    backdrop_path: string | null
    genre_ids: Array<number>
    id: number
    original_language: string
    overview: string
    popularity: number
    poster_path: string,
    vote_average: number
    vote_count: number
    video?: false
}

export interface IResponseSearchMovieResult extends IResponseSearchResult {
    original_title: string
    release_date: string,
    title: string
}

export interface IResponseSearchTvResult extends IResponseSearchResult {
    first_air_date: string,
    origin_country: string[],
    original_name: string
    name: string
}

export interface IResponseSearchMultiResult extends IResponseSearchResult {
    media_type: string,
    original_title: string,
    release_date: string,
    title: string,
}

export interface IRequestDetailsMovie {
    api_key: string
    language: string
}

export interface IRequestPopular {
    api_key: string,
    page: string,
    language: string,
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

export type TMovie = ICorrectMovieWithoutLang | ICorrectMovieWithLang

export interface ICorrectMovieWithoutLang {
    adult: boolean
    backdrop_path: string | null
    first_air_date?: string,
    genre_ids: Array<number>
    id: number
    media_type?: string,
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string,
    release_date: string,
    settings: {
        dateAdd: string,
        dateViewing: string[],
        isTv: boolean,
        tags: {
            tagName: string,
            color: string,
        }[],
    }
    title: string
    video?: false
    vote_average: number
    vote_count: number
}

export interface ICorrectMovieWithLang {
    adult: boolean
    backdrop_path_en: string
    backdrop_path_ru: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview_en: string
    overview_ru: string
    popularity: number
    poster_path_en: string,
    poster_path_ru: string,
    release_date: string,
    settings: {
        tags: {
            tagName: string,
            color: string,
        }[],
        dateAdd: string,
        dateViewing: string[],
        isTv: boolean,
    }
    title_en: string
    title_ru: string
    vote_average: number
    vote_count: number
    video?: false
    first_air_date?: string,
    origin_country: string[]
}

export interface IErrorResponse {
    error: string,
    message: string,
    statusCode: number,
}

export interface IDetailsMovie {
    adult: false,
    backdrop_path: string,
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string,
    } | null,
    budget: number,
    genres: {
        id: number,
        name: string
    }[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: {
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }[],
    production_countries: {
        iso_3166_1: string,
        name: string
    }[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: {
        english_name: string,
        iso_639_1: string,
        name: string
    }[],
    status: string,
    tagline: string,
    title?: string,
    name?: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    networks?: {
        id: string,
        logo_path: string,
        name: string,
        origin_country: string,
    }[],
    first_air_date?: string,
    last_air_date?: string,
    number_of_episodes?: number,
    number_of_seasons?: number,
    seasons?: {
        air_date: string,
        episode_count: number,
        id: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number,
    }[],
    type?: string,
}
// https://api.themoviedb.org/3/movie/452699/images?api_key=b72f01423c617f99db15bb46a8285ccb

// {
//     adult: false,
//     backdrop_path: "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
//     belongs_to_collection: {
//         id: 87359,
//         name: "Миссия невыполнима (Коллекция)",
//         poster_path: "/tr8Rl9wcSSBEeegkbDZjba4tGJk.jpg",
//         backdrop_path: "/jYl0UuJFcmhymv9ZNO14lPLDY1Z.jpg"
//     },
//     budget: 291000000,
//     genres: [
//         {
//             id: 28,
//             name: "боевик"
//         },
//         {
//             id: 53,
//             name: "триллер"
//         }
//     ],
//     homepage: "",
//     id: 575264,
//     imdb_id: "tt9603212",
//     original_language: "en",
//     original_title: "Mission: Impossible - Dead Reckoning Part One",
//     overview: "Итан Хант и его команда противосто",
//     popularity: 998.192,
//     poster_path: "/qncL23TGeAqmqmbBxJl4R6nYToJ.jpg",
//     production_companies: [
//         {
//             id: 4,
//             logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
//             name: "Paramount",
//             origin_country: "US"
//         },
//         {
//             id: 82819,
//             logo_path: "/gXfFl9pRPaoaq14jybEn1pHeldr.png",
//             name: "Skydance",
//             origin_country: "US"
//         },
//         {
//             id: 21777,
//             logo_path: null,
//             name: "TC Productions",
//             origin_country: "US"
//         }
//     ],
//     production_countries: [
//         {
//             iso_3166_1: "US",
//             name: "United States of America"
//         }
//     ],
//     release_date: "2023-07-08",
//     revenue: 567148955,
//     runtime: 164,
//     spoken_languages: [
//         {
//             english_name: "French",
//             iso_639_1: "fr",
//             name: "Français"
//         },
//         {
//             english_name: "English",
//             iso_639_1: "en",
//             name: "English"
//         },
//         {
//             english_name: "Italian",
//             iso_639_1: "it",
//             name: "Italiano"
//         },
//         {
//             english_name: "Russian",
//             iso_639_1: "ru",
//             name: "Pусский"
//         }
//     ],
//     status: "Released",
//     tagline: "",
//     title: "Миссия невыполнима: Смертельная расплата. Часть первая",
//     video: false,
//     vote_average: 7.728,
//     vote_count: 1861
// }