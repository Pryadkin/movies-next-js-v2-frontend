import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {deleteMovie} from "@/redux/reducers/profileReducer"
import {useAppDispatch} from "@/redux/store"

export const useDeleteMovie = () => {
    const dispatch = useAppDispatch()
    const deleteMovies = async (movieId: number) => {
        const res = await API.requestDeleteMovie(movieId)

        if (res) dispatch(deleteMovie(movieId))
    }

    const mutationDelete = useMutation({
        mutationFn: (movieId: number) => deleteMovies(movieId),
    })

    return {mutationDelete}
}
