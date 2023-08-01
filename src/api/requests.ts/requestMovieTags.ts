import {AxiosResponse} from 'axios'

import {errorMessage} from '@/notification'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'

export const requestMovieTags = async (): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_MOVIE_TAGS}`,
        )

        return (response as AxiosResponse<any>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            errorMessage(error, 'Axios request failed')
        } else {
            console.error('Unexpected error', error)
        }
    }
}