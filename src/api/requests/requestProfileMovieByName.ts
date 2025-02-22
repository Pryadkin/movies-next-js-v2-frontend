import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {ICorrectMovieWithLang} from '../apiTypes/requestMovies'
import {RequestUrl} from '../requestUrlList'

interface Props {
    movieName: string,
}

const setParams = (
    name: string,
): string => {
    const url = new URL(
        `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_MOVIE_BY_NAME}`,
    )

    url.searchParams.set('movieName', name)

    return url.href
}

export const requestProfileMovieByName = async ({
    movieName,
}: Props):
Promise<AxiosResponse<ICorrectMovieWithLang[]> | undefined> => {
    const url = setParams(
        movieName,
    )

    try {
        const response = await APIInstance.get(url)

        return (response as AxiosResponse<ICorrectMovieWithLang[]>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}