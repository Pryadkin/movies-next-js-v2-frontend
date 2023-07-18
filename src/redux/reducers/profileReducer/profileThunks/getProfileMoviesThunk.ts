import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/api'

import {AppThunk} from '../../../store/store'
import {setProfileMovies} from '../profileSlice'

export const getStaticProps = async () => {

}

export const getProfileMoviesThunk = (): AppThunk => (
    async (dispatch: Dispatch) => {

        const res = await API.requestProfileMovies()

        if (res) {
            const data = res.data

            dispatch(setProfileMovies(data))
        }
    }
)
