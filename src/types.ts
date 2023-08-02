export interface ITag {
    tagName: string,
    color: string,
}

export interface IGenre {
    id: number,
    name: string
}

export type TSortItem = 'ascDate' | 'descDate' | ''

export type TLanguage = 'ru-RU' | 'en-EN'
