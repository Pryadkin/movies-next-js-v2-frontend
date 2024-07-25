import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"
import {setProfileMovies} from "@/redux/reducers"
import {getSelectMovieIsWithDateOfViewing, getSelectSortItem} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"

export const useFetchProfileMovies = (
    numPage: number,
    size: number,
    filterByMovieName: string
) => {
    const dispatch = useAppDispatch()
    const sortItem = useSelector(getSelectSortItem)
    const movieIsWithDateOfViewing = useSelector(getSelectMovieIsWithDateOfViewing)

    const fetchMovies = async () => {
        const res = await API.requestProfileMovies({
            numPage,
            size,
            filterByMovieName,
            isWithDateOfViewing: movieIsWithDateOfViewing,
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
            RequestUrl.GET_PROFILE_MOVIES,
            numPage,
            size,
            filterByMovieName,
            sortItem.name,
            sortItem.type,
            movieIsWithDateOfViewing,
        ],
        queryFn: () => fetchMovies(),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
