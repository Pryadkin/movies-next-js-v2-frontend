import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {ICollectionMovies} from "@/pages/movie-collection/types"
import { RequestUrl } from "@/api/requestUrlList"

export const useSaveMoviesCollection = () => {
    const queryClient = useQueryClient();

    const saveMoviesCollection = async (collectionMovies: ICollectionMovies) => {
        const res = await API.requestSaveMoviesCollection(collectionMovies)

        if (res) {
            return res.data
        }

        return []
    }

    const {mutate, data} = useMutation({
        mutationKey: [RequestUrl.SAVE_MOVIE_COLLECTION],
        mutationFn: saveMoviesCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTIONS_NAME] });
        },

    })

    return {saveCollection: mutate, moviesCollection: data}
}
