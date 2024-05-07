import {AxiosResponse} from 'axios'

import {TLanguage, TMovieType} from '@/types'

import {APIInstance} from '../apiInstance'
import {IResponseTv} from '../apiTypes'
import {IRequestPopular, IResponseMovies} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestTopRated = async (
    page: string,
    typeMovie: TMovieType,
    lang: TLanguage
): Promise<AxiosResponse<IResponseTv | IResponseMovies> | undefined> => {
    const params: IRequestPopular = {
        api_key: process.env.API_MOVIE_KEY || '',
        page: page,
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}/${typeMovie}${RequestUrl.GET_TOP_RATED}`,
            {params}
        )

        return (response as AxiosResponse<IResponseTv | IResponseMovies>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}