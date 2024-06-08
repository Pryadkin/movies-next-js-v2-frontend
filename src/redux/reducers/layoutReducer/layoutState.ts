import {TMovie} from "@/api/apiTypes/requestMovies"
import {IPersonWithLang} from "@/api/apiTypes/requestPerson"
import {TLanguage} from "@/types"

import {IPersonWithoutLang} from './../../../api/apiTypes/requestPerson'

export interface State {
    language: TLanguage,
    isModalDetailsOpen: boolean,
    isAddMovieModalOpen: boolean,
    isAddPersonModalOpen: boolean,
    artistId: number | null,
    modelContent: {
        type: 'movie' | 'tv' | 'artist',
        id: number
    }[],
    selectMovie: TMovie| undefined | null,
    selectPerson: IPersonWithLang| IPersonWithoutLang | undefined | null,
}

export const initialState: State = {
    language: 'ru-RU',
    isModalDetailsOpen: false,
    isAddMovieModalOpen: false,
    isAddPersonModalOpen: false,
    artistId: null,
    modelContent: [],
    selectMovie: null,
    selectPerson: null,
}
