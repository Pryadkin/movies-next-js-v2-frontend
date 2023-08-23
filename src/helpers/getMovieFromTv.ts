import {IMovie, ITv} from "@/api/apiTypes"

export const getMovieFromTv = (data: ITv): IMovie => {
    return {
        ...data,
        release_date: data.first_air_date,
        title: data.name,
        original_title: data.original_name,
        video: false,
    }
}