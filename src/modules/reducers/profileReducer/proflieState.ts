import {IMovie} from "@/api/apiTypes/requestMovies"

export interface State {
    userName: string,
    myMovies: IMovie[],
}

export const initialState: State = {
    userName: 'Anton',
    myMovies: [],
}
