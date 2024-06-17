import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchMovieIds = () => {
    const fetchMovieIds = async () => {
        const res = await API.requestMovieIds()

        if (res) {
            return res.data
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [RequestUrl.GET_PROFILE_MOVIE_IDS],
        queryFn: fetchMovieIds,
    })

    return {
        movieIdsData: data,
        isMovieIdsFetching: isFetching,
        isError,
        error
    }
}
