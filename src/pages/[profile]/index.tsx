import {useSelector} from "react-redux"

import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getFilteredMovies} from "@/redux/selectors"

const Profile = () => {
    const {data, isFetching} = useFetchProfileMovies()
    const filteredMovies = useSelector(getFilteredMovies)

    return (
        <>
            {data && (
                <CardItems
                    data={filteredMovies}
                    isFetching={isFetching}
                    isProfileCard
                />
            )}
        </>
    )
}

export default Profile
