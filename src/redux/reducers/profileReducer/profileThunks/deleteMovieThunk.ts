import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/api'

import {AppThunk} from '../../../store/store'
import {deleteMovie} from '../profileSlice'

export const deleteMovieThunk = (id: number | string): AppThunk => (
    async (dispatch: Dispatch) => {
        const res = await API.requestDeleteMovie(id)

        if (res) {
            const data = res.data

            dispatch(deleteMovie(data))
        }
    }
)
