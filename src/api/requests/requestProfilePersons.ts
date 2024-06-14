import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IPersonDetailsWithLang} from '../apiTypes/responseArtistDetails'
import {RequestUrl} from '../requestUrlList'

interface Props {
    popularitySort: 'asc' | 'desc'
}

const setParams = (
    popularitySort: 'asc' | 'desc',
): string => {
    const url = new URL(
        `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_PERSONS}`,
    )

    url.searchParams.set('popularitySort', popularitySort)

    return url.href
}

export const requestProfilePersons = async ({
    popularitySort
}: Props):
Promise<AxiosResponse<IPersonDetailsWithLang[]> | undefined> => {
    const personUrl = setParams(popularitySort)

    try {
        const response = await APIInstance.get(personUrl)

        return (response as AxiosResponse<IPersonDetailsWithLang[]>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}