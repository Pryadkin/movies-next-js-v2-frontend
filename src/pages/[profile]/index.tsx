import {useEffect} from "react"
import {useSelector} from "react-redux"

import {useRouter} from 'next/router'

import {CardItems} from "@/components/CardItems"
import {getProfileMovies} from "@/redux/reducers"
import {getSelectMyMovies} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store/rootReducer"

const Profile = () => {
    const dispatch = useAppDispatch()
    const {asPath} = useRouter()
    const myMovies = useSelector(getSelectMyMovies)

    useEffect(() => {
        dispatch(getProfileMovies())
    }, [dispatch, asPath])

    console.log('myMovies', myMovies)
    return (
        <>
            {myMovies && (
                <CardItems movies={myMovies} />
            )}
        </>
    )
}

export default Profile
