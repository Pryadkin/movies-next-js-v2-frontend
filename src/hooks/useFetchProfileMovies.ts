import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {setProfileMovies} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useFetchProfileMovies = (numPage: number, size: number) => {
    const dispatch = useAppDispatch()

    const fetchMovies = async () => {
        const res = await API.requestProfileMovies(numPage, size)

        if (res) {
            dispatch(setProfileMovies(res.data.moviesPerPage))

            return res.data
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['profile-movies', numPage, size],
        queryFn: () => fetchMovies(),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
