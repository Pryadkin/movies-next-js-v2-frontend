import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useFetchCredits = (
    movieId: number,
    movieType: boolean,
    lang: TLanguage
) => {
    const fetchCredits = async (
        movieId: number,
        movieType: boolean,
        lang: TLanguage,
    ) => {
        const res = await API.requestCredits(
            movieId,
            movieType ? 'tv' : 'movie',
            lang
        )

        if (res && res.data.cast) {
            const updateCast = res.data.cast.map(elem => ({
                ...elem,
                profile_path: elem.profile_path ? getPictureUrlByShortUrl(elem.profile_path, 'w500') : ''
            }))
            const sortCast = updateCast.sort((a, b) => {
                if (b.popularity > a.popularity) return 1
                return -1
            })

            const updateCrew = res.data.crew.map(elem => ({
                ...elem,
                profile_path: elem.profile_path ? getPictureUrlByShortUrl(elem.profile_path, 'w500') : ''
            }))

            const sortCrew = updateCrew.sort((a, b) => b.popularity - a.popularity)

            return {
                ...res.data,
                cast: sortCast,
                crew: sortCrew
            }
        }

        return {
            cast: [],
            crew: [],
            id: 0
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['credits', movieId, lang],
        queryFn: () => fetchCredits(movieId, movieType, lang),
        keepPreviousData : true,
        enabled: !!movieId,
    })

    return {data, isFetching, isError, error}
}
