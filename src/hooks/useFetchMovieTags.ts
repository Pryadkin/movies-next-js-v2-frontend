

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useFetchMovieTags = () => {
    const dispatch = useAppDispatch()
    const fetchMovieTags = async () => {
        const res = await API.requestMovieTags()

        if (res) {
            dispatch(updateTags(res.data.tags))

            return res
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['movie-tags'],
        queryFn: () => fetchMovieTags(),
        keepPreviousData : true,
        enabled: true
    })

    return {data, isFetching, isError, error}
}
