import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {setProfileMovies} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useFetchProfileMovies = () => {
    const dispatch = useAppDispatch()

    const fetchMovies = async () => {
        const res = await API.requestProfileMovies()

        if (res) {
            dispatch(setProfileMovies(res.data))

            return res.data
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['profile-movies'],
        queryFn: () => fetchMovies(),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
