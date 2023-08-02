import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovieLang} from "@/api/apiTypes/requestMovies"

export const useSaveProfileMovie = () => {
    const saveMovies = async (value: IMovieLang) => {

        await API.requestSaveMovie(value)
    }

    const mutationSave = useMutation({
        mutationFn: (value: IMovieLang) => saveMovies(value),
    })

    return {mutationSave}
}
