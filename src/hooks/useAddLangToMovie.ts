import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {ICorrectMovie} from "@/api/apiTypes/requestMovies"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useAddLangToMovie = () => {
    const getMovie = async (
        movieName: string,
        language: TLanguage,
        movieType: string
    ) => {
        const getRequest = async () => {
            if (movieType === 'movie') {
                return await API.requestMovies(movieName, '1', language)
            }
            if (movieType === 'tv') {
                return await API.requestTv(movieName, '1', language)
            }

            return await API.requestMulti(movieName, '1', language)
        }

        const res = await getRequest()

        if (res) {
            const results = res.data.results

            const updateMovies = results.map(elem => {
                const getImageUrl = (url: string) => {
                    return url ? getPictureUrlByShortUrl(elem.poster_path, 'w500') : ''
                }

                const updateRes = {
                    ...elem,
                    poster_path: getImageUrl(elem.poster_path),
                    backdrop_path: elem.backdrop_path ? getImageUrl(elem.backdrop_path) : '',
                    settings: {
                        tags: [],
                        dateAdd: '',
                        dateViewing: []
                    }
                }

                return updateRes
            })

            return updateMovies
        }
    }

    const mutationAddLang = useMutation({
        mutationFn: ({
            movie,
            lang,
            movieType,
        }: {
            movie: ICorrectMovie,
            lang: TLanguage,
            movieType: string
        }): any => getMovie(movie.original_title, lang, movieType),
        onSuccess: () => {}
    })

    return {mutationAddLang}
}
