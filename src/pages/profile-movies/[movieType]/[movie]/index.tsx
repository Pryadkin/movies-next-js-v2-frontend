'client'

import {useSelector} from "react-redux"

import {useRouter} from "next/router"

import {MovieDetails} from "@/components/MovieDetails"
import {Spin} from "@/components/Spin/Spin"
import {useFetchDetailsMovie} from "@/hooks/useFetchDetailsMovie"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

import styles from './detailsMovie.module.scss'

const MovieDitailsPage = () => {
    const {query} = useRouter()
    const isTv = query.movieType === 'tv'
    const movieId = query.movie as string
    const lang = useSelector(getSelectLanguage)

    const {
        data,
    } = useFetchDetailsMovie(Number(movieId), lang, isTv)

    return (
        <div>
            {data
                ? (
                    <div className={styles.wrapper}>
                        <MovieDetails movie={data}/>
                    </div>

                )
                : (
                    <Spin />
                )
            }
        </div>

    )
}

export default MovieDitailsPage