import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IDetailsMovie} from "@/api/apiTypes"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useFetchDetailsMovie = (movieId: number | null, lang: TLanguage, isTv: boolean) => {
    const fetchDetailsMovie = async (
        value: number | null,
        lang: TLanguage,
        isTv: boolean,
    ): Promise<IDetailsMovie | null> => {
        const request = isTv
            ? (
                value && await API.requestDetailsTv(value, lang)
            )
            : (
                value && await API.requestDetailsMovie(value, lang)
            )
        const res = value ? request : null

        if (res) {
            const result =res.data
            const getImageUrl = (url: string) => {
                return url ? getPictureUrlByShortUrl(result.poster_path, 'w500') : ''
            }

            const belongsToCollection = result.belongs_to_collection
                ?  {
                    ...result.belongs_to_collection,
                    poster_path: getImageUrl(result.belongs_to_collection.poster_path),
                    backdrop_path: getImageUrl(result.belongs_to_collection.backdrop_path),
                }
                : null

            const updateRes: IDetailsMovie = {
                ...result,
                title: result.title || result.name,
                poster_path: getImageUrl(result.poster_path),
                backdrop_path: getImageUrl(result.backdrop_path),
                belongs_to_collection: belongsToCollection
            }

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
        queryKey: ['details-movie', movieId, lang],
        queryFn: () => fetchDetailsMovie(movieId, lang, isTv),
        keepPreviousData : true,
        enabled: !!movieId,
    })

    return {data, isFetching, isError, error}
}
