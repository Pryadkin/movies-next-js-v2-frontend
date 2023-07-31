import {DrawerProps} from 'antd'

import {IMovie} from "@/api/apiTypes/requestMovies"
import {IGenre, ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: IMovie[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    selectMovie: IMovie | undefined | null,
    tags: ITag[],
    enableFilters: ITag[],
    genres: IGenre[],
    selectGenres: IGenre[],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    selectMovie: null,
    tags: [],
    enableFilters: [],
    genres: [],
    selectGenres: []
}
