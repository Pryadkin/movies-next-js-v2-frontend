import {useEffect} from "react"
import {useSelector} from "react-redux"

import {useRouter} from 'next/router'

import {CardItems} from "@/components/CardItems"
import {getProfileMovies} from "@/modules/reducers"
import {RootState, useAppDispatch} from "@/modules/store/rootReducer"

const Profile = () => {
    const dispatch = useAppDispatch()
    const {asPath} = useRouter()
    const {myMovies} = useSelector((state: RootState) => state.profileReducer)

    useEffect(() => {
        dispatch(getProfileMovies())
    }, [dispatch, asPath])
    return (
        <>
            {myMovies && (
                <CardItems movies={myMovies} />
            )}
        </>
    )
}

export default Profile
