import getFullPathForPosters from '@/helpers/getFullPathForPosters'

import {APIInstance, api_key} from '../apiInstance'
import {IRequestMovies} from '../apiTypes/requestMovies'

export interface IFoundMoviesResults {
    id: number
    popularity: number
    vote_count: number
    video: false
    poster_path: string | null
    adult: boolean
    backdrop_path: string | null
    original_language: string
    original_title: string
    genre_ids: Array<number>
    title: string
    vote_average: number
    overview: string
    release_date: string
    filters: {
        id: number,
        name: string,
        path: string
    }[] | null
}

export const getMovies = async (name: string, isWithPicture: boolean, page: string) => {
    const params: IRequestMovies = {
        api_key,
        query: name,
        page: page,
        language: 'en-US',
        include_adult: false,
    }

    try {
        const response = await APIInstance.get(
            '/search/movie',
            {params}
        )
        const data = response.data
        let {results} = data

        if (isWithPicture) {
            results = results.filter((movie: IFoundMoviesResults) => {
                return movie.poster_path !== null
            })
        }

        data.results = getFullPathForPosters(results)
        return data

    } catch (err) {
        console.log(`😱 Axios request failed: ${err}`)
    }
}