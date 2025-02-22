import {ICorrectMovieWithLang} from "@/api/apiTypes/requestMovies"

export interface ICollectionForm {
    name: string,
    description: string,
    rating: number,
    movieList: string[]
}

export interface ICollectionMovies extends ICollectionForm {
    movies: (ICorrectMovieWithLang | null)[];
}