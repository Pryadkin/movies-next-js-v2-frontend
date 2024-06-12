import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchProfilePersons = () => {
    const fetchMovies = async () => {
        const res = await API.requestProfilePersons()

        if (res) {
            // dispatch(setProfileMovies(res.data.moviesPerPage))

            return res.data
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [
            RequestUrl.GET_PROFILE_PERSONS,
        ],
        queryFn: () => fetchMovies(),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
