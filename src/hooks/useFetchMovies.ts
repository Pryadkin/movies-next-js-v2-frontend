import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getPictureUrl} from "@/helpers/getPictureUrl"
import {getSelectMovieName, getSelectPage} from "@/redux/selectors"

const fetchMovies = async (value: string, page: string) => {
    const res = value ? await API.requestMovies(value, page) : null
    const updateRes = getPictureUrl(res?.data.results, true)

    return updateRes
}

export const useFetchMovies = async() => {
    const movieName = useSelector(getSelectMovieName)
    const page = useSelector(getSelectPage)

    const {
        isLoading,
        isError,
        status,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ['projects', movieName, page],
        queryFn: () => fetchMovies(movieName, page),
        keepPreviousData : true
    })

    return {data, isLoading, isError}
}
