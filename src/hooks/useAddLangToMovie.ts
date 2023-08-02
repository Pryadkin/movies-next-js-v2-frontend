import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {TLanguage} from "@/types"

export const useAddLangToMovie = () => {
    const getMovie = async (movieName: string, language: TLanguage) => {
        const res = await API.requestMovies(movieName, '1', language)

        if (res) {
            return res.data.results
        }
    }

    const mutationAddLang = useMutation({
        mutationFn: ({
            movieName,
            lang,
        }: {
            movieName: string,
            lang: TLanguage
        }): any => getMovie(movieName, lang),
    })

    return {mutationAddLang}
}
