import {TLanguage} from "@/types"

export interface State {
    language: TLanguage,
    isModalDetailsOpen: boolean,
    isAddMovieModalOpen: boolean,
    artistId: number | null,
    modelContent: {
        movieId:  number | null,
        artistId: number | null
    }
}

export const initialState: State = {
    language: 'ru-RU',
    isModalDetailsOpen: false,
    isAddMovieModalOpen: false,
    artistId: null,
    modelContent: {
        movieId:  null,
        artistId: null
    },
}
