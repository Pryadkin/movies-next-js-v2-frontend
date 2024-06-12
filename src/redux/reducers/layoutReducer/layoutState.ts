import {TMovie} from "@/api/apiTypes/requestMovies"
import {IArtistDetails} from "@/api/apiTypes/responseArtistDetails"
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
    selectPerson: IArtistDetails | undefined | null,
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
