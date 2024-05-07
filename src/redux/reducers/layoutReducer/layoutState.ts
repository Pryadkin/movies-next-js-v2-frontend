import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from "@/api/apiTypes/requestMovies"
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
    selectMovie: ICorrectMovieWithLang | ICorrectMovieWithoutLang | undefined | null,
}

export const initialState: State = {
    language: 'ru-RU',
    isModalDetailsOpen: false,
    isAddMovieModalOpen: false,
    artistId: null,
    modelContent: [],
    selectMovie: null
}
