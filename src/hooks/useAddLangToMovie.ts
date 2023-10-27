import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {getPictureUrlByShortUrl} from "@/helpers"
import {TLanguage} from "@/types"

export const useAddLangToMovie = () => {
    const getMovie = async (movieName: string, language: TLanguage) => {
        const res = await API.requestMovies(movieName, '1', language)

        if (res) {
            const result = res.data.results

            const updateMovies = result.map(elem => {
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
            movieName,
            lang,
        }: {
            movieName: string,
            lang: TLanguage
        }): any => getMovie(movieName, lang),
    })

    return {mutationAddLang}
}
