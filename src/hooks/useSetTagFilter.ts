import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"
import {ITag} from "@/types"

export const useSetTagFilter = () => {
    const queryClient = useQueryClient()
    const setTag = async (tag: ITag) => {
        const res = await API.requestSetTag(tag)

        if (res) {
            const result = res.data

            return result
        }
    }

    const mutationSetTagFilter = useMutation({
        mutationFn: setTag,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RequestUrl.GET_PROFILE_MOVIES],
            })
            queryClient.invalidateQueries({
                queryKey: [RequestUrl.GET_SELECT_TAGS],
            })
        }
    })

    return {mutationSetTagFilter}
}
