export interface ITag {
    tagName: string,
    color: string,
    isGroup?: boolean,
}

export interface IGenre {
    genreId: number,
    name: string
}

export type TLanguage = 'ru-RU' | 'en-EN'

export type TMovieType = 'movie' | 'tv' | 'multi'
