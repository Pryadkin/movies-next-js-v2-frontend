import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {TLanguage, TMovieType} from "@/types"

import {getMultiMovie} from "./useFetchMulti"

export const useFetchTopRated = (lang: TLanguage) => {
    const fetchTopRated = async (
        page: string,
        typeMovie: TMovieType,
        lang: TLanguage,
    ) => {
        const res = await API.requestTopRated(page, typeMovie, lang)

        if (res && res.data) {
            const multiMovie = getMultiMovie(res.data.results, lang)

            return {
                ...res.data,
                results: multiMovie
            }
        }

        return {
            results: [],
            page: 0,
            total_pages: 0,
            total_results: 0,
        }
    }

    const mutationMovieFetch = useMutation({
        mutationFn: ({
            page,
            typeMovie
        }: {
            page: string,
            typeMovie: TMovieType
        }) => fetchTopRated(String(page), typeMovie, lang),
    })

    return {mutationMovieFetch}
}
