import {Dispatch} from '@reduxjs/toolkit'

import {API} from '@/pages/api'
import {IMovie} from '@/pages/api/apiTypes/requestMovies'

import {AppThunk} from '../../../store/store'
import {setProfileMovies} from '../profileSlice'

export const getStaticProps = async () => {

}

export const getProfileMovies = (): AppThunk => (
    async (dispatch: Dispatch) => {

        const res = await API.requestProfileMovies()

        if (res) {
            const data = res.data

            dispatch(setProfileMovies(data))
        }
    }
)
