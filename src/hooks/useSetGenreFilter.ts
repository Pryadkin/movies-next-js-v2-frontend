import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
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
                queryKey: ['profile-movies'],
            })
        }
    })

    return {mutationSetGenreFilter}
}
