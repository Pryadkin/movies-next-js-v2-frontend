import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovieLang} from "@/api/apiTypes"
import {updateMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useUpdateProfileMovie = () => {
    const dispatch = useAppDispatch()
    const updateMovies = async (value: IMovieLang) => {
        const res = await API.requestUpdateProfileMovies(value)

        if (res) {
            dispatch(updateMovie(res.data))
        }
    }

    const mutationUpdate = useMutation({
        mutationFn: (movie: IMovieLang) => updateMovies(movie),
    })

    return {mutationUpdate}
}
