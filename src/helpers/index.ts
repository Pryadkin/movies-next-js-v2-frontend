import {TMovie} from '@/api/apiTypes'
import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'

import {IArtistDetails, IPersonDetailsWithLang} from './../api/apiTypes/responseArtistDetails'


export const isMovieWithoutLang = (movie: TMovie): movie is ICorrectMovieWithoutLang => {
    return !!(movie as ICorrectMovieWithoutLang).title
}

export const isPersonWithoutLang = (person: IArtistDetails | IPersonDetailsWithLang): person is IArtistDetails => {
    return !!(person as IArtistDetails).name
}

export {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'
export {getCorrectPrice} from './getCorrectPrice/getCorrectPrice'