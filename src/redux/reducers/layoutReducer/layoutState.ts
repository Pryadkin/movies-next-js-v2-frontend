import {TMovie} from "@/api/apiTypes/requestMovies"
import {IPerson} from "@/api/apiTypes/requestPerson"
import {IArtistDetails, IPersonDetailsWithLang} from "@/api/apiTypes/responseArtistDetails"
import {TLanguage} from "@/types"

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
    selectPerson: IArtistDetails | IPersonDetailsWithLang | IPerson | undefined | null,
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
