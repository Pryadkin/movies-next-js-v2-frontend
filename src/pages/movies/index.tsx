import {useSelector} from "react-redux"

import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getFilteredMovies, getSelectSearchMovie} from "@/redux/selectors"

const Profile = () => {
    const {data, isFetching} = useFetchProfileMovies()
    const filteredMovies = useSelector(getFilteredMovies)
    const searchMovie = useSelector(getSelectSearchMovie)
    const movie = searchMovie
        ? filteredMovies.filter(movie => {
            const movieEn = movie.title_en?.toLowerCase()
                .includes(searchMovie.toLowerCase())
            const movieRu = movie.title_ru?.toLowerCase()
                .includes(searchMovie.toLowerCase())
            return movieEn || movieRu
        })
        : filteredMovies

    return (
        <>
            {movie
                ? (
                    <CardItems
                        data={movie}
                        isFetching={isFetching}
                        isProfileCard
                    />
                )
                : (
                    <h2>The movies is not found</h2>
                )}
        </>
    )
}

export default Profile
