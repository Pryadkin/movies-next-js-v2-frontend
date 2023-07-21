import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovie} from "@/api/apiTypes/requestMovies"

export const useSaveProfileMovie = () => {
    const saveMovies = async (value: IMovie) => {
        await API.requestSaveMovie(value)
    }

    const mutationSave = useMutation({
        mutationFn: (value: IMovie) => saveMovies(value),
    })

    return {mutationSave}
}
