

import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {deleteTagFromMovies} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useDeleteMovieTags = () => {
    const dispatch = useAppDispatch()
    const deleteTag = async (value: string) => {
        const res = await API.requestDeleteMovieTags(value)

        if (res) {
            dispatch(deleteTagFromMovies(value))

            return res
        }
    }

    const mutationDeleteMovieTags = useMutation({
        mutationFn: (tagName: string) => deleteTag(tagName),
    })

    return {mutationDeleteMovieTags}
}
