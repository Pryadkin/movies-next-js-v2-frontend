import {DrawerProps} from 'antd'

import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"
import {TSortName} from '@/components/SidebareMovies/types'
import {IGenre, ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: ICorrectMovieWithLang[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    tags: ITag[],
    selectTags: ITag[],
    selectIgnoreTags: ITag[],
    sortItem: {name: TSortName, type: 'asc' | 'desc'},
    genres: IGenre[],
    genreFlagStatus: boolean;
    selectGenres: IGenre[],
    selectIgnoreGenres: IGenre[],
    searchMovie: string,
    isWithDateOfViewing: boolean,
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    tags: [],
    selectTags: [],
    selectIgnoreTags: [],
    sortItem: {
        name: 'date_of_viewing',
        type: 'asc'
    },
    genres: [],
    genreFlagStatus: true,
    selectGenres: [],
    selectIgnoreGenres: [],
    searchMovie: '',
    isWithDateOfViewing: true,
}
