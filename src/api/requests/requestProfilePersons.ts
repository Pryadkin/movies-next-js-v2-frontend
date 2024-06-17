import {AxiosResponse} from 'axios'

import {APIInstance} from '../apiInstance'
import {TGender, TPersonKnownDepartment, TPopularitySort} from '../apiTypes/requestPerson'
import {IPersonDetailsWithLang} from '../apiTypes/responseArtistDetails'
import {RequestUrl} from '../requestUrlList'

interface Props {
    popularitySort?: TPopularitySort
    genderFilter?: TGender
    knownDepartmentFilter?: TPersonKnownDepartment
}

const setParams = ({
    popularitySort,
    genderFilter,
    knownDepartmentFilter,
}: Props): string => {
    const url = new URL(
        `${RequestUrl.BASE_URL_LOCAL}${RequestUrl.GET_PROFILE_PERSONS}`,
    )

    popularitySort && url.searchParams.set('popularitySort', popularitySort)
    knownDepartmentFilter && url.searchParams.set('knownDepartmentFilter', knownDepartmentFilter)
    genderFilter && url.searchParams.set('filterByGender', genderFilter.toString())

    return url.href
}

export const requestProfilePersons = async ({
    popularitySort,
    genderFilter,
    knownDepartmentFilter,
}: Props):
Promise<AxiosResponse<IPersonDetailsWithLang[]> | undefined> => {
    const personUrl = setParams({
        popularitySort,
        genderFilter,
        knownDepartmentFilter,
    })

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