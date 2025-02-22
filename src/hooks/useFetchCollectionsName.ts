import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {RequestUrl} from "@/api/requestUrlList"

export const useFetchCollectionsName = () => {
    const fetchCollectionsName = async () => {
        const res = await API.requestGetCollectionsName()

        if (res) {
            return res.data
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [RequestUrl.GET_COLLECTIONS_NAME],
        queryFn: fetchCollectionsName,
    })

    return {
        collectionsName: data,
        isMoviesCollectionFetching: isFetching,
        isMoviesCollectionError: isError,
        error
    }
}
