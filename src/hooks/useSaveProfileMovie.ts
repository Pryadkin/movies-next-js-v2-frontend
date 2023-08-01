import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovie} from "@/api/apiTypes/requestMovies"
import {addSettingsToMovie} from "@/helpers/addSettingsToMovie"

export const useSaveProfileMovie = () => {
    const saveMovies = async (value: IMovie) => {
        const movieWithSettings = addSettingsToMovie(value)

        await API.requestSaveMovie(movieWithSettings)
    }

    const mutationSave = useMutation({
        mutationFn: (value: IMovie) => saveMovies(value),
    })

    return {mutationSave}
}
