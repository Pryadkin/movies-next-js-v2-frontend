import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"

export const useFetchMovieTags = () => {
    const fetchMovieTags = async () => {
        const res = await API.requestMovieTags()

        if (res) {
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
