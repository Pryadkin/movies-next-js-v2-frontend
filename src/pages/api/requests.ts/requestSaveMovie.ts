import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IMovie} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export interface IResponseMovie {
    status: number,
    message: string,
    movie: IMovie,
}

export const requestSaveMovie = async (movie: IMovie): Promise<AxiosResponse<IResponseMovie> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}/profile/${RequestUrl.ADD_MOVIE}`,
            {movie}
        )

        return (response as AxiosResponse<IResponseMovie>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}