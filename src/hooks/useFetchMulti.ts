import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IResponseTv, ITv} from "@/api/apiTypes"
import {IMovie, IMultiMovie, IResponseMovies} from "@/api/apiTypes/requestMovies"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TLanguage, TMovieType} from "@/types"

export const useFetchMulti = (lang: TLanguage) => {
    const dispatch = useAppDispatch()

    const setValueToRedux = (data: IResponseMovies | IResponseTv) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchMovies = async (
        name: string,
        selectType: TMovieType,
        page: string,
        lang: TLanguage,
    ) => {
        const getMovie = async () => {
            switch (selectType) {
                case 'movie':
                    return await API.requestMovies(name, page, lang)
                case 'tv':
                    return await API.requestTv(name, page, lang)
                case 'multi':
                    return await API.requestMulti(name, page, lang)

                default:
                    return null
            }
        }

        const res = await getMovie()

        if (res && res.data.results) {
            const resWithPicturs = {
                ...res.data,
                results: res.data.results.filter(elem => elem.poster_path)
            }

            const updateMovies: IMultiMovie[] = resWithPicturs.results.map(elem => {
                const isMovieResult = Boolean((elem as IMovie).title)
                const isTvResult = Boolean((elem as ITv).name)

                const getImageUrl = (url: string) => {
                    return url ? getPictureUrlByShortUrl(elem.poster_path, 'w500') : ''
                }

                const movieResult = elem as IMovie
                const tvResult = elem as ITv

                const title = isMovieResult
                    ? movieResult.title
                    : tvResult.name
                const poster_path_ru = lang === 'ru-RU'
                    ? getImageUrl(elem.poster_path)
                    : ''
                const poster_path_en = lang === 'en-EN'
                    ? getImageUrl(elem.poster_path)
                    : ''
                const backdrop_path = elem.backdrop_path ? getImageUrl(elem.backdrop_path) : ''
                const original_title = isMovieResult
                    ? movieResult.original_title
                    : tvResult.original_name
                const release_date = isMovieResult
                    ? movieResult.release_date
                    : tvResult.first_air_date

                const updateRes = {
                    ...elem,
                    id: tvResult ? elem.id : elem.id,
                    title,
                    original_title,
                    poster_path_ru,
                    poster_path_en,
                    poster_path: lang === 'ru-RU'
                        ? poster_path_ru
                        : poster_path_en,
                    backdrop_path,
                    release_date,
                    settings: {
                        isTv: isTvResult,
                        tags: [],
                        dateAdd: '',
                        dateViewing: []
                    }
                }

                console.log('updateRes', updateRes)

                return updateRes
            })

            setValueToRedux(res.data)

            return updateMovies
        }

        return []
    }

    const mutationMovieFetch = useMutation({
        mutationFn: ({
            searchName,
            movieType,
            page
        }: {
            searchName: string,
            movieType: TMovieType,
            page: string,
        }) => fetchMovies(searchName, movieType, page, lang),
    })

    return {mutationMovieFetch}
}
