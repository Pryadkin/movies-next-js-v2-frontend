import {DrawerProps} from 'antd'

import {IMovie} from "@/api/apiTypes/requestMovies"
import {IGenre, TSortItem, ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: IMovie[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    selectMovie: IMovie | undefined | null,
    tags: ITag[],
    selectTags: ITag[],
    selectIgnoreTags: ITag[],
    sortItem: TSortItem,
    genres: IGenre[],
    genreFlagStatus: boolean;
    selectGenres: IGenre[],
    selectIgnoreGenres: IGenre[],
    searchMovie: string,
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    selectMovie: null,
    tags: [],
    selectTags: [],
    selectIgnoreTags: [],
    sortItem: 'ascReleaseDate',
    genres: [],
    genreFlagStatus: true,
    selectGenres: [],
    selectIgnoreGenres: [],
    searchMovie: ''
}
