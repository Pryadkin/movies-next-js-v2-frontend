import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import { ICorrectMovieWithLang } from "@/api/apiTypes/requestMovies"
import { RequestUrl } from "@/api/requestUrlList"

export const useSaveMovieToCollection = () => {
    const queryClient = useQueryClient();

    const saveMovieToCollection = async (movie: ICorrectMovieWithLang, collectionName: string) => {
        const res = await API.requestSaveMovieToCollection(movie, collectionName)

        if (res) {
            return res.data
        }

        return []
    }

    const {mutate, data} = useMutation({
        mutationKey: [RequestUrl.SET_MOVIE_TO_COLLECTION],
        mutationFn: ({
            movie,
            collectionName
        }: {
            movie: ICorrectMovieWithLang,
            collectionName: string
        }) => saveMovieToCollection(movie, collectionName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RequestUrl.GET_COLLECTION_BY_NAME] });
        },
    })

    return {saveMovieToCollection: mutate, collection: data}
}