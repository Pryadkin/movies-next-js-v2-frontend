
import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useDeleteTag = () => {
    const dispatch = useAppDispatch()
    const deleteTag = async (value: string) => {
        const res = await API.requestDeleteTag(value)

        if (res) {
            dispatch(updateTags(res.data.tags))

            return res
        }
    }

    const mutationDelete = useMutation({
        mutationFn: (tag: string) => deleteTag(tag),
    })

    return {mutationDelete}
}
