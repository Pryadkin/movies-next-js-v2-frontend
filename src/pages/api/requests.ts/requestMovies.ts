import {AxiosResponse} from 'axios'

import {APIInstance, api_key} from '../apiInstance'
import {IRequestMovies, IResponseMovies} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

export const requestMovies = async (name: string, page: string): Promise<AxiosResponse<IResponseMovies> | undefined> => {
    const params: IRequestMovies = {
        api_key,
        query: name,
        page: page,
        language: 'en-US',
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