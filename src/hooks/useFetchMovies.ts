import {useDispatch, useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getPictureUrl} from "@/helpers/getPictureUrl"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {getSelectMovieName, getSelectPage} from "@/redux/selectors"

export const useFetchMovies = () => {
    const dispatch = useDispatch()
    const movieName = useSelector(getSelectMovieName)
    const page = useSelector(getSelectPage)

    const fetchMovies = async (value: string, page: string) => {
        const res = value ? await API.requestMovies(value, page) : null
        const updateRes = getPictureUrl(res?.data.results, true)

        res?.data.page && dispatch(setPage(res?.data.page))
        res?.data.total_pages && dispatch(setTotalPages(res?.data.total_pages))
        res?.data.total_results && dispatch(setTotalResults(res?.data.total_results))

        return updateRes
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['projects', movieName, page],
        queryFn: () => fetchMovies(movieName, String(page)),
        // select: data => getPictureUrl(data?.data.results, true),
        keepPreviousData : true,
        enabled: !!movieName
    })

    return {data, isFetching, isError}
}
