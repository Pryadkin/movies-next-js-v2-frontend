import {IMovie} from "@/pages/api/apiTypes/requestMovies"

export interface State {
    userName: string,
    myMovies: IMovie[],
}

export const initialState: State = {
    userName: '',
    myMovies: [],
}
