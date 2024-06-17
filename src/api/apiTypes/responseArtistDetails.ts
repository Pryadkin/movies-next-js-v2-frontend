

export interface IArtistDetails {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: any
    gender: number
    homepage: any
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
}

export type TPersonDetailsState = IPersonDetailsWithouLang | IPersonDetailsWithLang

export interface IPersonDetailsWithouLang {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: any
    gender: number
    homepage: any
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
    settings: {
        tags: string[]
    }
}

export interface IPersonDetailsWithLang {
    adult: boolean
    also_known_as_ru: string[]
    also_known_as_en: string[]
    biography_ru: string
    biography_en: string
    birthday: string
    deathday: any
    gender: number
    homepage: any
    id: number
    imdb_id: string
    known_for_department: 'Acting' | 'Directior'
    name_ru: string
    name_en: string
    place_of_birth: string
    popularity: number
    profile_path: string
    settings: {
        tags: string[]
    }
}
