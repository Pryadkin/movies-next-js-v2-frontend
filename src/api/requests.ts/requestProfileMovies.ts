import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IMovie} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestProfileMovies = async (): Promise<AxiosResponse<IMovie[]> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_MOVIES}`,
        )

        return (response as AxiosResponse<IMovie[]>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}