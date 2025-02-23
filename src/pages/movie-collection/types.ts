import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"

export interface ICollectionMovies {
    id: string,
    name: string,
    description: string,
    rating: number,
    movieList: {
        id: number,
        name: string,
        movie: ICorrectMovieWithLang | null,
    }[]
}