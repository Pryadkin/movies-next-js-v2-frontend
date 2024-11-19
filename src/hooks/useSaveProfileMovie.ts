import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"
import {RequestUrl} from "@/api/requestUrlList"

export const useSaveProfileMovie = () => {
    const queryClient = useQueryClient()
    const saveMovies = async (value: ICorrectMovieWithLang) => {
        await API.requestSaveMovie(value)
    }

    const mutationSave = useMutation({
        mutationFn: (value: ICorrectMovieWithLang) => saveMovies(value),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [RequestUrl.GET_PROFILE_MOVIES, 
            RequestUrl.GET_TOP_RATED]})
    })

    return {mutationSave}
}
