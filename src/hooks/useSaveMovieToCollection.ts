import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import { ICorrectMovieWithLang } from "@/api/apiTypes/requestMovies"
import { RequestUrl } from "@/api/requestUrlList"

export const useSaveMovieToCollection = (collectionName: string) => {
    const queryClient = useQueryClient();

    const saveMovieToCollection = async (movie: ICorrectMovieWithLang) => {
        const res = await API.requestSaveMovieToCollection(movie, collectionName)

        if (res) {
            return res.data
        }

        return []
    }

    const {mutate, data} = useMutation({
        mutationKey: [RequestUrl.SET_MOVIE_TO_COLLECTION],
        mutationFn: saveMovieToCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTION_BY_NAME, collectionName] });
        },
    })

    return {saveMovieToCollection: mutate, collection: data}
}