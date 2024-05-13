import {AxiosResponse} from 'axios'

import {errorMessage} from '@/notification'
import {IGenre} from '@/types'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'

export const requestSelectGenres = async (): Promise<AxiosResponse<IGenre[]> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_SELECT_GENRES}`,
        )

        return (response as AxiosResponse<IGenre[]>)
    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            errorMessage(error, 'Axios request failed')
        } else {
            console.error('Unexpected error', error)
        }
    }
}