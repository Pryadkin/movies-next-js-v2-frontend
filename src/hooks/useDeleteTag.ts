
import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {ITag} from "@/types"

export const useDeleteTag = () => {
    const dispatch = useAppDispatch()
    const deleteTag = async (value: ITag) => {
        const res = await API.requestDeleteTag(value)

        if (res) {
            dispatch(updateTags(res.data))

            return res
        }
    }

    const mutationDelete = useMutation({
        mutationFn: (tag: ITag) => deleteTag(tag),
    })

    return {mutationDelete}
}
