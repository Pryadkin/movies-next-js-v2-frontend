import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IResponseMovies} from "@/api/apiTypes/requestMovies"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {getSelectMovieName, getSelectPage} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useFetchMovies = (lang: TLanguage) => {
    const dispatch = useAppDispatch()
    const movieName = useSelector(getSelectMovieName)
    const page = useSelector(getSelectPage)

    const setValueToRedux = (data: IResponseMovies) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchMovies = async (
        name: string,
        page: string,
        lang: TLanguage,
    ) => {
        const res = name ? await API.requestMovies(name, page, lang) : null

        if (res && res.data.results) {
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

            setValueToRedux(res.data)

            return updateMovies
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['search-movies', movieName, page, lang],
        queryFn: () => fetchMovies(movieName, String(page), lang),
        keepPreviousData : true,
        enabled: !!movieName
    })

    return {data, isFetching, isError, error}
}
