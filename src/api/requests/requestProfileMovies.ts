import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {ICorrectMovieWithLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

const setParams = (numberPage: number, limit: number, movieName: string): string => {
    const url = new URL(
        `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_MOVIES}`,
    )

    url.searchParams.set('numberPage', `${numberPage}`)
    url.searchParams.set('limit', `${limit}`)
    url.searchParams.set('filterByMovieName', movieName)

    return url.href
}

export const requestProfileMovies = async (
    numPage: number,
    size: number,
    filterByMovieName: string,
):
Promise<AxiosResponse<{moviesPerPage: ICorrectMovieWithLang[], total: number}> | undefined> => {
    const taskUrl = setParams(numPage, size, filterByMovieName)

    try {
        const response = await APIInstance.get(taskUrl)

        return (response as AxiosResponse<{moviesPerPage: ICorrectMovieWithLang[], total: number}>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}