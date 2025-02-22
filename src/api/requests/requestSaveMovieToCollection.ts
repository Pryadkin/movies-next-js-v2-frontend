import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {ICorrectMovieWithLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestSaveMovieToCollection = async (
    movie: ICorrectMovieWithLang,
    collectionName: string
):Promise<AxiosResponse<ICorrectMovieWithLang> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.SET_MOVIE_TO_COLLECTION}`,
            {movie, collectionName}
        )

        successMessage('movies collection save successfully')
        return (response as AxiosResponse<ICorrectMovieWithLang>)

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