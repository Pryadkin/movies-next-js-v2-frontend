import {IMovie} from "@/api/apiTypes"
import getFullPathForPosters from "@/helpers/getFullPathForPosters"

export const getPictureUrl = (
    results: IMovie[],
    isWithPicture: boolean,
) => {
    const updateResults = isWithPicture
        ? results.filter((movie: IMovie) => {
            return movie.poster_path !== null
        })
        : results


    const fullPathPoster = updateResults.map(item => {
        return getFullPathForPosters(item)
    })

    return Array.isArray(fullPathPoster) ? fullPathPoster : [fullPathPoster]
}