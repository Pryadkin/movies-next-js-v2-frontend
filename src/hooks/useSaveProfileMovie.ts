import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {ICorrectMovie} from "@/api/apiTypes/requestMovies"

export const useSaveProfileMovie = () => {
    const queryClient = useQueryClient()
    const saveMovies = async (value: ICorrectMovie) => {
        await API.requestSaveMovie(value)
    }

    const mutationSave = useMutation({
        mutationFn: (value: ICorrectMovie) => saveMovies(value),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['profile-movies']})
    })

    return {mutationSave}
}
