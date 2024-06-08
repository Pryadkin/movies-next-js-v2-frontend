export interface ITag {
    tagName: string,
    color: string,
    isGroup?: boolean,
}

export interface IGenre {
    genreId: number,
    name: string
}

export type TSortItem = 'ascDate' | 'descDate' | 'ascReleaseDate' | 'descReleaseDate' | ''

export type TLanguage = 'ru-RU' | 'en-EN'

export type TMovieType = 'movie' | 'tv' | 'multi'
