import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {IMovieLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestSaveMovie = async (movie: IMovieLang):Promise<AxiosResponse<IMovieLang> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.ADD_PROFILE_MOVIE}`,
            movie
        )

        successMessage('movie added successfully')
        return (response as AxiosResponse<IMovieLang>)

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