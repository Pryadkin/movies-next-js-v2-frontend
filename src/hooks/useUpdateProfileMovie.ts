import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {TMovie} from "@/api/apiTypes"
import {RequestUrl} from "@/api/requestUrlList"
import {updateMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useUpdateProfileMovie = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const updateMovies = async (value: TMovie) => {
        const res = await API.requestUpdateProfileMovies(value)

        if (res) {
            dispatch(updateMovie(res.data))
        }
    }

    const mutationUpdate = useMutation({
        mutationFn: (movie: TMovie) => updateMovies(movie),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [RequestUrl.GET_PROFILE_MOVIES],
            })
        }
    })

    return {mutationUpdate}
}
