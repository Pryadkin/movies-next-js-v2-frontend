import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {setProfileMovies} from "@/redux/reducers"
import {getSelectMovieIsWithoutDateInBack, getSelectSortItem} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"

export const useFetchProfileMovies = (
    numPage: number,
    size: number,
    filterByMovieName: string
) => {
    const dispatch = useAppDispatch()
    const sortItem = useSelector(getSelectSortItem)
    const movieIsWithoutDateInBack = useSelector(getSelectMovieIsWithoutDateInBack)

    const fetchMovies = async () => {
        const res = await API.requestProfileMovies({
            numPage,
            size,
            filterByMovieName,
            filterByMovieWithoutDate: movieIsWithoutDateInBack,
            sortItem,
        })

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
        queryKey: [
            'profile-movies',
            numPage,
            size,
            filterByMovieName,
            sortItem,
            movieIsWithoutDateInBack,
        ],
        queryFn: () => fetchMovies(),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
