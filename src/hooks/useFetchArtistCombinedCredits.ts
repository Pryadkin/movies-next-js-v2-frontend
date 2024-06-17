import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {TResponseSearchMovie} from "@/api/apiTypes/responseArtistCombinedCredits"
import {getCorrectMovieWithoutLang} from "@/helpers/getCorrectMovieWithoutLang"
import {getModelContent} from "@/redux/selectors"
import {TLanguage} from "@/types"

export const useFetchArtistCombinedCredits = (artistId: number | null, lang: TLanguage) => {
    const modelContent = useSelector(getModelContent)

    const fetchArtistCombinedCredits = async (
        artistId: number | null,
        lang: TLanguage,
    ) => {
        const res = artistId && await API.requestArtistCombinedCredits(artistId, lang)

        if (res) {
            const cast = res.data.cast

            // delete elements with equal id
            const correctCast: TResponseSearchMovie = []
            for(let i = 0; i < cast.length; i++) {
                const movie = cast[i]
                const elems = cast.filter(c => c.id === movie.id)

                const isMoreOne = elems.length > 1
                const isExist = correctCast.some(m => m.id === elems[0].id)

                if (isMoreOne && !isExist) correctCast.push((elems as any)[0])
                if (!isMoreOne) correctCast.push((movie as any))
            }

            return {
                cast: getCorrectMovieWithoutLang(correctCast, lang),
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
        queryKey: ['combinedCredits', lang, modelContent],
        queryFn: () => fetchArtistCombinedCredits(artistId, lang),
        enabled: !!artistId,
    })

    return {data, isFetching, isError, error}
}
