import {useSelector} from "react-redux"

import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getSelectMyMovies} from "@/redux/selectors/profileSelectors"

const Profile = () => {
    const {data, isFetching} = useFetchProfileMovies()
    const myMovies = useSelector(getSelectMyMovies)

    return (
        <>
            {data && (
                <CardItems
                    data={myMovies}
                    isFetching={isFetching}
                    isProfileCard
                />
            )}
        </>
    )
}

export default Profile
