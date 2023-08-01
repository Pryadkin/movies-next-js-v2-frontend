import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'

import {APIInstance} from '../apiInstance'
import {IErrorResponse, IMovie} from '../apiTypes'
import {RequestUrl} from '../requestUrlList'

export const requestUpdateProfileMovies = async (movie: IMovie):Promise<AxiosResponse<IMovie> | undefined> => {
    try {
        const response = await APIInstance.put(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.UPDATE_PROFILE_MOVIE}`,
            movie
        )

        successMessage('movie update successfully')
        return (response as AxiosResponse<IMovie>)

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