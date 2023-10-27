export interface ITag {
    tagName: string,
    color: string,
}

export interface IGenre {
    id: number,
    name: string
}

export type TSortItem = 'ascDate' | 'descDate' | 'ascReleaseDate' | 'descReleaseDate' | ''

export type TLanguage = 'ru-RU' | 'en-EN'

export type TMovieType = 'movie' | 'tv' | 'multi'
