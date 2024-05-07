import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IDetailsMovie} from "@/api/apiTypes"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useFetchDetailsTv = (tvId: string, lang: TLanguage) => {
    const fetchDetailsTv = async (
        value: string,
        lang: TLanguage,
    ): Promise<IDetailsMovie | null> => {
        const res = value ? await API.requestDetailsMovie(value, lang) : null

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
        queryKey: ['details-tv', tvId, lang],
        queryFn: () => fetchDetailsTv(tvId, lang),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
