import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/api'
import {IMovie} from '@/api/apiTypes/requestMovies'

import {AppThunk} from '../../../store/store'
import {setMovie} from '../profileSlice'

export const addMovieThunk = (movie: IMovie): AppThunk => (
    async (dispatch: Dispatch) => {
        const res = await API.requestSaveMovie(movie)

        if (res) {
            const data = res.data

            dispatch(setMovie(data))
        }
    }
)
