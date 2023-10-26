import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IDetailsMovie, IRequestDetailsMovie} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestDetailsTv = async (
    tvId: string,
    lang: TLanguage
): Promise<AxiosResponse<IDetailsMovie> | undefined> => {
    const params: IRequestDetailsMovie = {
        api_key: process.env.API_MOVIE_KEY || '',
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_DETAILS_TV}/${tvId}`,
            {params}
        )

        return (response as AxiosResponse<IDetailsMovie>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}