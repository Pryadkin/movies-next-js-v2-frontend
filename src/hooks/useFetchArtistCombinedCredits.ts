import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getCorrectMovieWithoutLang} from "@/helpers/getCorrectMovieWithoutLang"
import {TLanguage} from "@/types"

export const useFetchArtistCombinedCredits = (artistId: number | null, lang: TLanguage) => {
    const fetchArtistCombinedCredits = async (
        artistId: number | null,
        lang: TLanguage,
    ) => {
        const res = artistId && await API.requestArtistCombinedCredits(artistId, lang)

        if (res) {
            return {
                cast: getCorrectMovieWithoutLang(res.data.cast, lang),
                crew: getCorrectMovieWithoutLang(res.data.crew, lang),
            }
        }

        return null
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['combinedCredits', lang],
        queryFn: () => fetchArtistCombinedCredits(artistId, lang),
        // keepPreviousData : true,
        enabled: !!artistId,
    })

    return {data, isFetching, isError, error}
}
