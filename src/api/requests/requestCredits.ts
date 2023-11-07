import {AxiosResponse} from 'axios'

import {TLanguage, TMovieType} from '@/types'

import {APIInstance} from '../apiInstance'
import {IResponseCredits} from '../apiTypes/responseCredits'
import {RequestUrl} from '../requestUrlList'

export const requestCredits = async (
    movieId: number,
    movieType: TMovieType,
    lang: TLanguage
): Promise<AxiosResponse<IResponseCredits> | undefined> => {
    const params: any = {
        api_key: process.env.API_MOVIE_KEY || '',
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}/${movieType}/${movieId}/${RequestUrl.GET_CREDITS}`,
            {params}
        )

        return (response as AxiosResponse<IResponseCredits>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}