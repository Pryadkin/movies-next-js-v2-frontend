import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IRequestMovies, IResponseMovies} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestMulti = async (
    name: string,
    page: string,
    lang: TLanguage
): Promise<AxiosResponse<IResponseMovies> | undefined> => {
    const params: IRequestMovies = {
        api_key: process.env.API_MOVIE_KEY || '',
        query: name,
        page: page,
        language: lang,
        include_adult: false,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_MULTI}`,
            {params}
        )

        return (response as AxiosResponse<IResponseMovies>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}