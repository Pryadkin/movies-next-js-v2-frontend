import {DrawerProps} from 'antd'

import {IMovie} from "@/api/apiTypes/requestMovies"

export interface State {
    userName: string,
    myMovies: IMovie[],
    isDrawerMovieTagsOpen: DrawerProps['open'],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
    isDrawerMovieTagsOpen: false,
}
