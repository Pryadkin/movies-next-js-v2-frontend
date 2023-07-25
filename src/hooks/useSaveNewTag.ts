import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {updateTags} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

export const useSaveNewTag = () => {
    const dispatch = useAppDispatch()
    const saveTag = async (value: string) => {
        const res = await API.requestSaveTag(value)

        if (res) {
            dispatch(updateTags(res.data.tags))

            return res
        }
    }

    const mutationSave = useMutation({
        mutationFn: (tag: string) => saveTag(tag),
    })

    return {mutationSave}
}
