import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchSelectGenres = () => {
    const fetchSelectGenres = async () => {
        const res = await API.requestSelectGenres()

        if (res) {
            const result = res.data

            return result
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [RequestUrl.GET_SELECT_GENRES],
        queryFn: fetchSelectGenres,
        keepPreviousData : true,
    })

    return {
        selectGenres: data,
        isGenresFetching: isFetching,
        isError,
        error
    }
}
