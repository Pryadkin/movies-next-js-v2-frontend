import {AxiosResponse} from 'axios'

import {errorMessage} from '@/notification'
import {ITag} from '@/types'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'

export const requestSelectTags = async (): Promise<AxiosResponse<ITag[]> | undefined> => {
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_SELECT_TAGS}`,
        )

        return (response as AxiosResponse<ITag[]>)
    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            errorMessage(error, 'Axios request failed')
        } else {
            console.error('Unexpected error', error)
        }
    }
}