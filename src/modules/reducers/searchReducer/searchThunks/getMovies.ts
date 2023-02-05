import {Dispatch} from '@reduxjs/toolkit'

import getFullPathForPosters from '@/helpers/getFullPathForPosters'
import {API} from '@/pages/api'
import {IMovie} from '@/pages/api/apiTypes/requestMovies'

import {AppThunk} from '../../../store/store'
import {setMovies} from '../searchSlice'

export const getMovies = (value: string, isWithPicture: boolean, page: string): AppThunk => (
    async (dispatch: Dispatch) => {
        const res = await API.requestMovies(value, page)

        if (res) {
            const data = res.data
            let {results} = data

            if (isWithPicture) {
                results = results.filter((movie: IMovie) => {
                    return movie.poster_path !== null
                })
            }

            (data as any).results = getFullPathForPosters(results)

            dispatch(setMovies(data))
        }

    }
)
