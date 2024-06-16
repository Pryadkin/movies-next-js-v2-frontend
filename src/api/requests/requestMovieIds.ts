import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'

export const requestMovieIds = async (): Promise<AxiosResponse<number[]> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_MOVIE_IDS}`,
        )

        return (response as AxiosResponse<number[]>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}