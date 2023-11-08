import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IArtistCombinedCredits} from '../apiTypes/responseArtistCombinedCredits'
import {RequestUrl} from '../requestUrlList'

export const requestArtistCombinedCredits = async (
    artistId: number,
    lang: TLanguage
): Promise<AxiosResponse<IArtistCombinedCredits> | undefined> => {
    const params: any = {
        api_key: process.env.API_MOVIE_KEY || '',
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_PERSON}/${artistId}/combined_credits`,
            {params}
        )

        return (response as AxiosResponse<IArtistCombinedCredits>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}