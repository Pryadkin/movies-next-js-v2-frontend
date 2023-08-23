import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IRequestTv, IResponseTv} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestTv = async (
    name: string,
    page: string,
    lang: TLanguage
): Promise<AxiosResponse<IResponseTv> | undefined> => {
    const params: IRequestTv = {
        api_key: process.env.API_MOVIE_KEY || '',
        query: name,
        page: page,
        language: lang,
        include_adult: false,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_TV}`,
            {params}
        )

        return (response as AxiosResponse<IResponseTv>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}