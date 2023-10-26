export interface IResponseMovies {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}

export interface IRequestDetailsMovie {
    api_key: string
    language: string
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
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
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
//     overview: "Итан Хант и его команда противостоят системе искусственного интеллекта Entity, которая вышла из под контроля и стала угрозой человечества.",
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