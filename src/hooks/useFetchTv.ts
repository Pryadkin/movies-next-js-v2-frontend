import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IResponseTv} from "@/api/apiTypes"
import {getPictureUrlByShortUrl} from "@/helpers"
import {getMovieFromTv} from "@/helpers/getMovieFromTv"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {getSelectPage} from "@/redux/selectors"
import {getSelectTvName} from "@/redux/selectors/searchSelectors"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useFetchTv = (lang: TLanguage) => {
    const dispatch = useAppDispatch()
    const tvName = useSelector(getSelectTvName)
    const page = useSelector(getSelectPage)

    const setValueToRedux = (data: IResponseTv) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchTv = async (
        value: string,
        page: string,
        lang: TLanguage,
    ) => {
        const res = value ? await API.requestTv(value, page, lang) : null

        if (res) {
            const result = res.data.results

            setValueToRedux(res.data)

            const intoMovie = result.map(item => getMovieFromTv(item))

            const updateMovies = intoMovie.map(elem => {
                const getImageUrl = (url: string) => {
                    return url ? getPictureUrlByShortUrl(elem.poster_path, 'w500') : ''
                }

                const updateRes = {
                    ...elem,
                    poster_path: getImageUrl(elem.poster_path),
                    backdrop_path: elem.backdrop_path ? getImageUrl(elem.backdrop_path) : '',
                    settings: {
                        isTv: true,
                        tags: [],
                        dateAdd: '',
                        dateViewing: []
                    }
                }

                return updateRes
            })

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
        queryKey: ['search-tv', tvName, page, lang],
        queryFn: () => fetchTv(tvName, String(page), lang),
        keepPreviousData : true,
        enabled: !!tvName
    })

    return {data, isFetching, isError, error}
}
