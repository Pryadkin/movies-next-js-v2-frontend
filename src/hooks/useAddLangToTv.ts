import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {getMovieFromTv} from "@/helpers/getMovieFromTv"
import {TLanguage} from "@/types"

export const useAddLangToTv = () => {
    const getMovie = async (movieName: string, language: TLanguage) => {
        const res = await API.requestTv(movieName, '1', language)

        if (res) {
            const result = res.data.results
            const intoMovie = result.map(item => getMovieFromTv(item))

            return intoMovie
        }
    }

    const mutationAddLangTv = useMutation({
        mutationFn: ({
            movieName,
            lang,
        }: {
            movieName: string,
            lang: TLanguage
        }): any => getMovie(movieName, lang),
    })

    return {mutationAddLangTv}
}
