import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchSelectTags = () => {
    const fetchSelectTags = async () => {
        const res = await API.requestSelectTags()

        if (res) {
            const result = res.data

            return result
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [RequestUrl.GET_SELECT_TAGS],
        queryFn: fetchSelectTags,
        keepPreviousData : true,
    })

    return {
        selectTags: data,
        isTagsFetching: isFetching,
        isError,
        error
    }
}
