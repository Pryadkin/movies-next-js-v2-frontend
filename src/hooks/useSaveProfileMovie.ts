import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"

export const useSaveProfileMovie = () => {
    const queryClient = useQueryClient()
    const saveMovies = async (value: ICorrectMovieWithLang) => {
        await API.requestSaveMovie(value)
    }

    const mutationSave = useMutation({
        mutationFn: (value: ICorrectMovieWithLang) => saveMovies(value),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['profile-movies']})
    })

    return {mutationSave}
}
