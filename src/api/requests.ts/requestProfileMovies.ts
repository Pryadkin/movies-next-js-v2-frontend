import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IMovieLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestProfileMovies = async (): Promise<AxiosResponse<IMovieLang[]> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_MOVIES}`,
        )

        return (response as AxiosResponse<IMovieLang[]>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}