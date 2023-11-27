import dayjs from 'dayjs'

import {
    ICorrectMovieWithoutLang,
    IResponseSearchMovieResult,
    IResponseSearchMultiResult,
    IResponseSearchTvResult,
} from '@/api/apiTypes/requestMovies'
import {TLanguage} from '@/types'

import {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'

const dateFormat = 'YYYY-MM-DD:hh-mm-ss A'

export const getCorrectMovieWithoutLang = (
    data: IResponseSearchMovieResult[] |
    IResponseSearchTvResult[] |
    IResponseSearchMultiResult[],
    lang: TLanguage
): ICorrectMovieWithoutLang[] => {
    const resWithPicturs = data.filter(elem => elem.poster_path)
    const updateMovies: ICorrectMovieWithoutLang[] = resWithPicturs.map(elem => {

        const isMovieResult = Boolean((elem as IResponseSearchMovieResult).title)
        const isTvResult = Boolean((elem as IResponseSearchTvResult).name)
        const isMultiResult = Boolean((elem as IResponseSearchMultiResult).media_type)

        const getImageUrl = (url: string) => {
            return url ? getPictureUrlByShortUrl(elem.poster_path, 'w500') : ''
        }

        const movieResult = elem as IResponseSearchMovieResult | IResponseSearchMultiResult
        const tvResult = elem as IResponseSearchTvResult

        const title = isMovieResult && isMultiResult
            ? movieResult.title
            : tvResult.name
        const poster_path_ru = lang === 'ru-RU'
            ? getImageUrl(elem.poster_path)
            : ''
        const poster_path_en = lang === 'en-EN'
            ? getImageUrl(elem.poster_path)
            : ''
        const backdrop_path = elem.backdrop_path
            ? getImageUrl(elem.backdrop_path)
            : ''
        const original_title = isMovieResult
            ? movieResult.original_title
            : tvResult.original_name
        const release_date = isMovieResult
            ? movieResult.release_date
            : tvResult.first_air_date

        const dateAdd = dayjs()
            .format(dateFormat)

        const updateRes = {
            ...elem,
            id: elem.id,
            title,
            original_title,
            poster_path: lang === 'ru-RU'
                ? poster_path_ru
                : poster_path_en,
            backdrop_path,
            release_date,
            settings: {
                isTv: isTvResult,
                tags: [],
                dateAdd,
                dateViewing: []
            }
        }

        return updateRes
    })

    return updateMovies
}