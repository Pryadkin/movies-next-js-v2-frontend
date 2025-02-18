import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {getCorrectMovieWithoutLang} from "@/helpers/getCorrectMovieWithoutLang"
import {TLanguage, TMovieType} from "@/types"

export const useFetchCollection = (lang: TLanguage) => {
    const fetchCollection = async (
        page: string,
        typeMovie: TMovieType,
        lang: TLanguage,
        requestUrl: string,
    ) => {
        const res = await API.requestCollection(page, typeMovie, lang, requestUrl)

        if (res && res.data) {
            const multiMovie = getCorrectMovieWithoutLang(res.data.results, lang)

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
            typeMovie,
            requestUrl,
        }: {
            page: string,
            typeMovie: TMovieType,
            requestUrl: string,
        }) => fetchCollection(String(page), typeMovie, lang, requestUrl),
    })

    return {mutationMovieFetch}
}
