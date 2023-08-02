import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IResponseMovies} from "@/api/apiTypes/requestMovies"
import {getPictureUrl} from "@/helpers/getPictureUrl"
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
        value: string,
        page: string,
        lang: TLanguage,
    ) => {
        const res = value ? await API.requestMovies(value, page, lang) : null
        const updateRes = getPictureUrl(res?.data.results, true)

        if (res) setValueToRedux(res.data)

        return updateRes
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
