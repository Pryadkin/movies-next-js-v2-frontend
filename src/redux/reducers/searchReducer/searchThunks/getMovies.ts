import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/api'
import {IMovie} from '@/api/apiTypes/requestMovies'
import getFullPathForPosters from '@/helpers/getFullPathForPosters'

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
