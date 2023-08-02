import {DrawerProps} from 'antd'

import {IMovieLang} from "@/api/apiTypes/requestMovies"
import {IGenre, TSortItem, ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: IMovieLang[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    selectMovie: IMovieLang | undefined | null,
    tags: ITag[],
    enableFilters: ITag[],
    sortItem: TSortItem,
    genres: IGenre[],
    genreFlagStatus: boolean;
    selectGenres: IGenre[],
    selectIgnoreGenres: IGenre[],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    selectMovie: null,
    tags: [],
    enableFilters: [],
    sortItem: '',
    genres: [],
    genreFlagStatus: true,
    selectGenres: [],
    selectIgnoreGenres: [],
}
