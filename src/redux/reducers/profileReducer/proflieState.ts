import {DrawerProps} from 'antd'

import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"
import {IGenre, TSortItem, ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: ICorrectMovieWithLang[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    tags: ITag[],
    selectTags: ITag[],
    selectIgnoreTags: ITag[],
    sortItem: TSortItem,
    genres: IGenre[],
    genreFlagStatus: boolean;
    selectGenres: IGenre[],
    selectIgnoreGenres: IGenre[],
    searchMovie: string,
    isWithoutDateInBack: boolean,
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    tags: [],
    selectTags: [],
    selectIgnoreTags: [],
    sortItem: 'ascDate',
    genres: [],
    genreFlagStatus: true,
    selectGenres: [],
    selectIgnoreGenres: [],
    searchMovie: '',
    isWithoutDateInBack: true,
}
