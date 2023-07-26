import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useUpdateTags = () => {
    const dispatch = useAppDispatch()
    const updateTag = async (oldTag: string, newTag: string) => {
        const res = await API.requestUpdateTags(oldTag, newTag)

        if (res) {
            dispatch(updateTags(res.data.tags))

            return res
        }
    }

    const mutationTagsUpdate = useMutation({
        mutationFn: ({
            oldTag,
            newTag
        } : {
            oldTag: string,
            newTag: string
        }): any => updateTag(oldTag, newTag),
    })

    return {mutationTagsUpdate}
}
