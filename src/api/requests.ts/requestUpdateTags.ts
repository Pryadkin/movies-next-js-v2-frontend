import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'
import {ITag} from '@/types'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestUpdateTags = async (
    oldTag: string,
    newTag: string
):Promise<AxiosResponse<ITag[]> | undefined> => {
    try {
        const response = await APIInstance.put(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.UPDATE_TAGS}`,
            {
                oldTagName: oldTag,
                newTagName: newTag
            }
        )

        successMessage('tags updated successfully')
        return (response as AxiosResponse<ITag[]>)

    } catch (error) {
        if (axios.isAxiosError(error))  {
            const err = (error.response?.data as IErrorResponse)

            console.error('axiosError', error)
            errorMessage(error, err.message)
        } else if (error instanceof Error) {
            console.error('error', error)
            errorMessage(error, error.message)
        } else {
            console.error('Unexpected error', error)
            errorMessage(error as Error, 'Unexpected error')
        }
    }
}