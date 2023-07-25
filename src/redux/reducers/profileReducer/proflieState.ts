import {DrawerProps} from 'antd'

import {IMovie} from "@/api/apiTypes/requestMovies"

export interface State {
    userName: string,
    myMovies: IMovie[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
    selectMovie: IMovie | undefined | null,
    tags: string[],
    enableFilters: string[],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
    selectMovie: null,
    tags: ['Horror, Action, Camedy'],
    enableFilters: [],
}
