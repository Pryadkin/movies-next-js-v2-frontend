/* eslint-disable @typescript-eslint/no-unused-vars */
import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from "@/api/apiTypes/requestMovies"
import {TLanguage} from '@/types'

type TKeyName = 'title'
| 'poster_path'
| 'backdrop_path'
| 'overview'

const deleteExtraValueFromMovie = (movie: any) => {
    const {
        title,
        overview,
        poster_path,
        backdrop_path,
        name,
        original_name,
        media_type,
        ...rest
    } = movie

    return rest
}

export const getCorrectMovieWithLang = (
    movie: ICorrectMovieWithoutLang,
    lang: TLanguage
) => {
    const getValueWithLang = (keyName: TKeyName) => {
        if (lang === 'ru-RU') {
            return ({
                [`${keyName}_en`]: '',
                [`${keyName}_ru`]: movie[keyName],
            })
        }
        return ({
            [`${keyName}_en`]: movie[keyName],
            [`${keyName}_ru`]: '',
        })
    }

    const addLangValueToMovie = {
        ...movie,
        ...getValueWithLang('title'),
        ...getValueWithLang('overview'),
        ...getValueWithLang('poster_path'),
        ...getValueWithLang('backdrop_path'),
    }

    const correctMovieWithLang = deleteExtraValueFromMovie(addLangValueToMovie) as ICorrectMovieWithLang

    return correctMovieWithLang
}