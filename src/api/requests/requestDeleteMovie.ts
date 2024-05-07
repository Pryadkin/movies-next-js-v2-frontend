import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'


export const requestDeleteMovie = async (id: string | number): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await APIInstance.delete(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.DELETE_PROFILE_MOVIE}`,
            {data: {id}}
        )

        return (response as AxiosResponse<any>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}