import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IMovie} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'


export const requestSaveMovie = async (movie: IMovie): Promise<AxiosResponse<IMovie> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}/profile/${RequestUrl.ADD_MOVIE}`,
            movie
        )

        return (response as AxiosResponse<IMovie>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}