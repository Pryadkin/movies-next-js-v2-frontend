import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/pages/api'
import {IMovie} from '@/pages/api/apiTypes/requestMovies'

import {AppThunk} from '../../../store/store'
import {setMovie} from '../profileSlice'


export const addMovie = (movie: IMovie): AppThunk => (
    async (dispatch: Dispatch) => {
        const res = await API.requestSaveMovie(movie)

        if (res) {
            const data = res.data
            const {movie} = data

            dispatch(setMovie(movie))
        }
    }
)
