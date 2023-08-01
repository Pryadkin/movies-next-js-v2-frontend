import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {ITag} from "@/types"

export const useSaveNewTag = () => {
    const dispatch = useAppDispatch()
    const saveTag = async (value: ITag) => {
        const res = await API.requestSaveTag(value)

        if (res) {
            dispatch(updateTags(res.data))

            return res
        }
    }

    const mutationSave = useMutation({
        mutationFn: (tag: ITag) => saveTag(tag),
    })

    return {mutationSave}
}
