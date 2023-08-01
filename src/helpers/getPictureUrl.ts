import {IMovie} from "@/api/apiTypes"
import getFullPathForPosters from "@/helpers/getFullPathForPosters"

export const getPictureUrl = (
    results: any,
    isWithPicture: boolean,
) => {
    const updateResults = isWithPicture
        ? results.filter((movie: IMovie) => {
            return movie.poster_path !== null
        })
        : results

    const fullPathPoster = getFullPathForPosters(updateResults)

    return Array.isArray(fullPathPoster) ? fullPathPoster : [fullPathPoster]
}