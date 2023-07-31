import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'
import {ITag} from '@/types'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestDeleteMovieTags = async (tagName: string):Promise<AxiosResponse<ITag[]> | undefined> => {
    try {
        const response = await APIInstance.delete(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.DELETE_MOVIE_TAGS}`, {
                data: {tagName}
            }
        )

        successMessage('tag removed successfully')
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