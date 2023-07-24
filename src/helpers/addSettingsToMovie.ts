import dayjs from 'dayjs'

import {IMovie} from "@/api/apiTypes"

const dateFormat = 'YYYY-MM-DD:hh-mm-ss A'

export const addSettingsToMovie = (movie: IMovie) => {
    const dateAdd = dayjs()
        .format(dateFormat)
    return {
        ...movie,
        settings: {
            tags: [],
            dateAdd,
        }
    }
}