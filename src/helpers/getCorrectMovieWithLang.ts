/* eslint-disable @typescript-eslint/no-unused-vars */
import {ICorrectMovieWithLang, ICorrectMovieWithoutLang, TMovie} from "@/api/apiTypes/requestMovies"
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
    currentMovie: ICorrectMovieWithoutLang,
    movWithAnotherLang: ICorrectMovieWithoutLang,
    lang: TLanguage
) => {
    const getValueWithLang = (keyName: TKeyName) => {
        if (lang === 'ru-RU') {
            return ({
                [`${keyName}_en`]: currentMovie[keyName],
                [`${keyName}_ru`]: movWithAnotherLang[keyName],
            })
        }
        return ({
            [`${keyName}_en`]: movWithAnotherLang[keyName],
            [`${keyName}_ru`]: currentMovie[keyName],
        })
    }

    const addLangValueToMovie = {
        ...movWithAnotherLang,
        ...getValueWithLang('title'),
        ...getValueWithLang('overview'),
        ...getValueWithLang('poster_path'),
        ...getValueWithLang('backdrop_path'),
        settings: currentMovie.settings,
    }

    const correctMovieWithLang = deleteExtraValueFromMovie(addLangValueToMovie) as ICorrectMovieWithLang

    return correctMovieWithLang
}