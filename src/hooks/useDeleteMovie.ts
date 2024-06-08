import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"
import {deleteMovie} from "@/redux/reducers/profileReducer"
import {useAppDispatch} from "@/redux/store"

export const useDeleteMovie = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const deleteMovies = async (movieId: number) => {
        const res = await API.requestDeleteMovie(movieId)

        if (res) dispatch(deleteMovie(movieId))
    }

    const mutationDelete = useMutation({
        mutationFn: (movieId: number) => deleteMovies(movieId),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [RequestUrl.GET_PROFILE_MOVIES],
            })
        }
    })

    return {mutationDelete}
}
