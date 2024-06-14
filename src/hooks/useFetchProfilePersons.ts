import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {TPopularitySort} from "@/api/apiTypes/requestPerson"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchProfilePersons = (popularitySort: TPopularitySort) => {
    const fetchMovies = async () => {
        const res = await API.requestProfilePersons({
            popularitySort
        })

        if (res) {
            // dispatch(setProfileMovies(res.data.moviesPerPage))

            return res.data
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [
            RequestUrl.GET_PROFILE_PERSONS,
            popularitySort,
        ],
        queryFn: fetchMovies,
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
