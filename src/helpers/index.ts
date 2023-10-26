import {IMovie, IMovieLang} from "@/api/apiTypes"

export const isIMovie = (obj: any): obj is IMovie => {
    return obj.poster_path !== undefined
}

export const isIMovieLang = (obj: any): obj is IMovieLang => {
    return obj.poster_path_en !== undefined
}

export {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'