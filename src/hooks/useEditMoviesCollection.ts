import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {ICollectionMovies} from "@/pages/movie-collection/types"
import { RequestUrl } from "@/api/requestUrlList"

export const useEditMoviesCollection = (collectionName: string) => {
    const queryClient = useQueryClient();

    const editMoviesCollection = async (updateCollection: ICollectionMovies) => {
        const res = await API.requestEditMovieCollection(updateCollection)

        if (res) {
            return res.data
        }

        return undefined
    }

    const {mutate, data} = useMutation({
        mutationKey: [RequestUrl.EDIT_MOVIE_COLLECTION],
        mutationFn: editMoviesCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    RequestUrl.GET_COLLECTIONS_NAME
                ]
            });
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTION_BY_NAME, collectionName] });
        },

    })

    return {editCollection: mutate, moviesEditCollection: data}
}
