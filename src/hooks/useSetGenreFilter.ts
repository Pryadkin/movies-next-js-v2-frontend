import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"
import {IGenre} from "@/types"

export const useSetGenreFilter = () => {
    const queryClient = useQueryClient()
    const setGenres = async (genre: IGenre) => {
        const res = await API.requestSetGenre(genre)

        if (res) {
            const result = res.data

            return result
        }
    }

    const mutationSetGenreFilter = useMutation({
        mutationFn: setGenres,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RequestUrl.GET_PROFILE_MOVIES],
            })
        }
    })

    return {mutationSetGenreFilter}
}
