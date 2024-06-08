import {TMovie} from '@/api/apiTypes'
import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {IPersonWithoutLang, TPersonState} from '@/api/apiTypes/requestPerson'


export const isMovieWithoutLang = (movie: TMovie): movie is ICorrectMovieWithoutLang => {
    return !!(movie as ICorrectMovieWithoutLang).title
}

export const isPersonWithoutLang = (person: TPersonState): person is IPersonWithoutLang => {
    return !!(person as IPersonWithoutLang).name
}

export {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'
export {getCorrectPrice} from './getCorrectPrice/getCorrectPrice'