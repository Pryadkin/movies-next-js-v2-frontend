import axios, {AxiosResponse} from 'axios'

import {errorMessage, successMessage} from '@/notification'
import {ICollectionMovies} from '@/pages/movie-collection/types'

import {APIInstance} from '../apiInstance'
import {IErrorResponse} from '../apiTypes'
import {ICorrectMovieWithLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestSaveMoviesCollection = async (
    collectionMovies: ICollectionMovies,
):Promise<AxiosResponse<ICorrectMovieWithLang[]> | undefined> => {
    try {
        const response = await APIInstance.post(
            `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.SAVE_MOVIE_COLLECTION}`, collectionMovies
        )

        successMessage('movies collection save successfully')
        return (response as AxiosResponse<ICorrectMovieWithLang[]>)

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