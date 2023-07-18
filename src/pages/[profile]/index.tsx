import {useEffect} from "react"
import {useSelector} from "react-redux"

import {useRouter} from 'next/router'

import {CardItems} from "@/components/CardItems"
import {getProfileMoviesThunk} from "@/redux/reducers"
import {getSelectMyMovies} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store/rootReducer"

const Profile = () => {
    const dispatch = useAppDispatch()
    const {asPath} = useRouter()
    const myMovies = useSelector(getSelectMyMovies)

    useEffect(() => {
        dispatch(getProfileMoviesThunk())
    }, [dispatch, asPath])

    return (
        <>
            {myMovies && (
                <CardItems
                    movies={myMovies}
                    isProfileCard
                />
            )}
        </>
    )
}

export default Profile
