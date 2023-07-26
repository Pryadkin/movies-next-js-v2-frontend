import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IRequestMovies, IResponseMovies} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

const langEN = 'en-US'
const langRu = 'ru-RU'

export const requestMovies = async (name: string, page: string): Promise<AxiosResponse<IResponseMovies> | undefined> => {
    const params: IRequestMovies = {
        api_key: process.env.API_MOVIE_KEY || '',
        query: name,
        page: page,
        language: langEN,
        include_adult: false,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_MOVIES}`,
            {params}
        )

        return (response as AxiosResponse<IResponseMovies>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}