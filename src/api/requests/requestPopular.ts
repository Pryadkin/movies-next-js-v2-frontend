import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IRequestPopular} from '../apiTypes/requestMovies'
import {IResponsePopular} from '../apiTypes/requestPopular'
import {RequestUrl} from '../requestUrlList'

export const requestPopular = async (
    page: string,
    lang: TLanguage
): Promise<AxiosResponse<IResponsePopular> | undefined> => {
    const params: IRequestPopular = {
        api_key: process.env.API_MOVIE_KEY || '',
        page: page,
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_POPULAR}`,
            {params}
        )

        return (response as AxiosResponse<IResponsePopular>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}