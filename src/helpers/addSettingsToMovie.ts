import {IMovie} from "@/api/apiTypes"

export const addSettingsToMovie = (movies: IMovie[]) => {
    const updateMovies = movies.map(movie => {
        if (movie.settings) {
            return movie
        }
        return {
            ...movie,
            settings: {
                tags: []
            }
        }
    })

    return updateMovies
}