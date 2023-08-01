import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {getGenres} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useFetchGenres = () => {
    const dispatch = useAppDispatch()

    const fetchGenres = async () => {
        const res = await API.requestGenres()

        if (res) {
            dispatch(getGenres(res.data))

            return res.data
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['genres'],
        queryFn: () => fetchGenres(),
        keepPreviousData : true,
    })

    return {
        genresData: data,
        isGenresFetching: isFetching,
        isError,
        error
    }
}
