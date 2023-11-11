import {IMovie} from "@/api/apiTypes"
import {TLanguage} from "@/types"

export interface State {
    language: TLanguage,
    isModalDetailsOpen: boolean,
    isAddMovieModalOpen: boolean,
    artistId: number | null,
    modelContent: {
        type: 'movie' | 'tv' | 'artist',
        id: number
    }[],
    selectMovie: IMovie | undefined | null,
}

export const initialState: State = {
    language: 'ru-RU',
    isModalDetailsOpen: false,
    isAddMovieModalOpen: false,
    artistId: null,
    modelContent: [],
    selectMovie: null
}
