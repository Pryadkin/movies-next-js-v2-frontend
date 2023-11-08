import {AxiosResponse} from 'axios'

import {TLanguage} from '@/types'

import {APIInstance} from '../apiInstance'
import {IArtistDetails} from '../apiTypes/responseArtistDetails'
import {RequestUrl} from '../requestUrlList'

export const requestArtistDetails = async (
    artistId: number,
    lang: TLanguage
): Promise<AxiosResponse<IArtistDetails> | undefined> => {
    const params: any = {
        api_key: process.env.API_MOVIE_KEY || '',
        language: lang,
    }

    try {
        const response = await APIInstance.get(
            `${RequestUrl.BASE_URL}${RequestUrl.GET_PERSON}/${artistId}`,
            {params}
        )

        return (response as AxiosResponse<IArtistDetails>)

    } catch (error) {
        if (error instanceof Error) {
            console.error(`😱 Axios request failed: ${error}`)
            // errorMessage(error, t('error'), t('error.playAudio'))
        } else {
            console.error('Unexpected error', error)
        }
    }
}