import {DrawerProps} from 'antd'

import {IMovie} from "@/api/apiTypes/requestMovies"
import {ITag} from '@/types'

export interface State {
    userName: string,
    myMovies: IMovie[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    selectMovie: IMovie | undefined | null,
    tags: ITag[],
    enableFilters: ITag[],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    selectMovie: null,
    tags: [],
    enableFilters: [],
}
