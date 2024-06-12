import {useDispatch} from 'react-redux'

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IArtistDetails} from "@/api/apiTypes/responseArtistDetails"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setSelectPerson} from '@/redux/reducers'
import {TLanguage} from "@/types"

export const useFetchArtistDetails = (artistId: number | null, lang: TLanguage) => {
    const dispatch = useDispatch()
    const getImageUrl = (url: string) => {
        return url ? getPictureUrlByShortUrl(url, 'w500') : ''
    }

    const fetchArtistDetails = async (
        artistId: number | null,
        lang: TLanguage,
    ) => {
        const res = artistId && await API.requestArtistDetails(artistId, lang)

        if (res) {
            const result = res.data

            const resultsWithCorrectUrl: IArtistDetails = {
                ...result,
                profile_path: getImageUrl(result.profile_path),
            }

            dispatch(setSelectPerson(resultsWithCorrectUrl))

            return resultsWithCorrectUrl
        }

        return null
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['artist-details', lang, artistId],
        queryFn: () => fetchArtistDetails(artistId, lang),
        keepPreviousData : true,
        enabled: !!artistId,
    })

    return {data, isFetching, isError, error}
}
