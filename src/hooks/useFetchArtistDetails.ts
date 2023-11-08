import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useFetchArtistDetails = (artistId: number | null, lang: TLanguage) => {
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


            const updateRes = {
                ...result,
                profile_path: getImageUrl(result.profile_path),
            }


            // console.log('updateMovies', updateRes)

            return updateRes
        }

        return null
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['artist-details', lang],
        queryFn: () => fetchArtistDetails(artistId, lang),
        keepPreviousData : true,
        enabled: !!artistId,
    })

    return {data, isFetching, isError, error}
}
