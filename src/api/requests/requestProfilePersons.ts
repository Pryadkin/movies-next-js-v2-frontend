import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {IPersonDetailsWithLang} from '../apiTypes/responseArtistDetails'
import {RequestUrl} from '../requestUrlList'


export const requestProfilePersons = async ():
Promise<AxiosResponse<IPersonDetailsWithLang[]> | undefined> => {
    try {
        const response = await APIInstance.get(`${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_PERSONS}`)

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