import {TLanguage} from "@/types"

export interface State {
    language: TLanguage,
    isModalDetailsOpen: boolean,
    isAddMovieModalOpen: boolean,
}

export const initialState: State = {
    language: 'ru-RU',
    isModalDetailsOpen: false,
    isAddMovieModalOpen: false,
}
