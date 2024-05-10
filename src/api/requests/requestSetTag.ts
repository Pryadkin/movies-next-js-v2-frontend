import {AxiosResponse} from 'axios'

import {errorMessage} from '@/notification'
import {ITag} from '@/types'

import {APIInstance} from '../apiInstance'
import {RequestUrl} from '../requestUrlList'

export const requestSetTag = async (tag: ITag): Promise<AxiosResponse<ITag[]> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.BY_TAG_FILTER}`,
            tag
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