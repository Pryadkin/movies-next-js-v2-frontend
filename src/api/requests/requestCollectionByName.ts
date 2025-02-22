import axios, {AxiosResponse} from 'axios'

import {errorMessage} from '@/notification'
import {ICollectionMovies} from '@/pages/movie-collection/types'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestCollectionByName= async (name: string):Promise<AxiosResponse<ICollectionMovies> | undefined> => {
    const params = {name}
    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_COLLECTION_BY_NAME}`, {params}
        )

        return (response as AxiosResponse<ICollectionMovies>)
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