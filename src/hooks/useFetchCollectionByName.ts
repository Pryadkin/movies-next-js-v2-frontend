import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import { RequestUrl } from "@/api/requestUrlList"

export const useFetchCollectionByName = () => {
    const fetchCollectionByName = async (collectionName: string) => {
        const res = await API.requestCollectionByName(collectionName)

        if (res) {
            return res.data
        }
    }

    const {data, error, isLoading, mutate, isSuccess} = useMutation({
        mutationKey: [RequestUrl.GET_COLLECTION_BY_NAME],
        mutationFn: fetchCollectionByName,
    })


    return {collection: data, getCollectionByName: mutate, error, isLoading, isSuccess}
}
