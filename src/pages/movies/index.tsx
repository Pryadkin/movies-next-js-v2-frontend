import {useSelector} from "react-redux"

import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getFilteredMovies, getSelectSearchMovie} from "@/redux/selectors"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

const Profile = () => {
    const {data, isFetching} = useFetchProfileMovies()
    const filteredMovies = useSelector(getFilteredMovies)
    const lang = useSelector(getSelectLanguage)
    const searchMovie = useSelector(getSelectSearchMovie)
    const movie = searchMovie
        ? filteredMovies.filter(movie => {
            const title = lang === 'en-EN' ? 'title_en' : 'title_ru'
            return movie[title]?.toLowerCase()
                .startsWith(searchMovie.toLowerCase())
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
