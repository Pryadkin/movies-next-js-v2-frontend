import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import { RequestUrl } from "@/api/requestUrlList"

export const useDeleteMoviesCollection = (collectionName: string) => {
    const queryClient = useQueryClient();

    const deleteMoviesCollection = async (collectionId: string) => {
        await API.requestDeleteMoviesCollection(collectionId)
    }

    const {mutate, data} = useMutation({
        mutationKey: [RequestUrl.SAVE_MOVIE_COLLECTION],
        mutationFn: deleteMoviesCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTIONS_NAME] });
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTION_BY_NAME, collectionName] });
        },
    })

    return {deleteCollection: mutate, moviesCollection: data}
}
