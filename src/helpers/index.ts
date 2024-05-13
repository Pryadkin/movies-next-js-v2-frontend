import {TMovie} from '@/api/apiTypes'
import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'


export const isMovieWithoutLang = (movie: TMovie): movie is ICorrectMovieWithoutLang => {
    return !!(movie as ICorrectMovieWithoutLang).title
}

export {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'
export {getCorrectPrice} from './getCorrectPrice/getCorrectPrice'