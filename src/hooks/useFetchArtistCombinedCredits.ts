import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {TLanguage} from "@/types"

import {getMultiMovie} from "./useFetchMulti"

export const useFetchArtistCombinedCredits = (artistId: number | null, lang: TLanguage) => {
    const fetchArtistCombinedCredits = async (
        artistId: number | null,
        lang: TLanguage,
    ) => {
        const res = artistId && await API.requestArtistCombinedCredits(artistId, lang)

        if (res) {
            const cast = res.data.cast
            const crew = res.data.crew

            const multiMovieCast = getMultiMovie(cast, lang)
            const multiMovieCrew = getMultiMovie(crew, lang)

            return {
                cast: multiMovieCast,
                crew: multiMovieCrew
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
        keepPreviousData : true,
        enabled: !!artistId,
    })

    return {data, isFetching, isError, error}
}
