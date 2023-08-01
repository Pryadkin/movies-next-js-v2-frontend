import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovie} from "@/api/apiTypes/requestMovies"
import {updateMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useUpdateProfileMovie = () => {
    const dispatch = useAppDispatch()
    const updateMovies = async (value: IMovie) => {
        const res = await API.requestUpdateProfileMovies(value)

        if (res) {
            dispatch(updateMovie(res.data))
        }
    }

    const mutationUpdate = useMutation({
        mutationFn: (movie: IMovie) => updateMovies(movie),
    })

    return {mutationUpdate}
}
