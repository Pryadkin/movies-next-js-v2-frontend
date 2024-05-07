import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {ICorrectMovie} from "@/api/apiTypes/requestMovies"
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
            movie,
            lang,
        }: {
            movie: ICorrectMovie,
            lang: TLanguage,
            movieType: string
        }): any => getMovie(movie.original_title, lang),
    })

    return {mutationAddLangTv}
}
