import {useState} from "react"

import {useRouter} from "next/router"

import {IMovie, IMultiMovie} from "@/api/apiTypes/requestMovies"
import {setCurrentMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TMovieType} from "@/types"

import styles from './ArtistDetails.module.scss'

export const Credit = ({credit}: {credit: IMultiMovie}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isMouseOver, setIsMouseOver] = useState(false)
    const movieType: TMovieType = credit.settings.isTv ? 'tv' : 'movie'

    return (
        <div
            className={styles.creditItem}
            onClick={() => {
                dispatch(setCurrentMovie(credit as unknown as IMovie))
                router.push(`/movies/${movieType}/${credit.id}`)
                // dispatch(sestIsModalDetailsOpen(true))
            }}
        >
            <img
                src={credit.poster_path_ru}
                alt={credit.title}
                onMouseOver={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
            />
            {isMouseOver && (
                <div className={styles.creditTitle}>
                    {credit.title}
                </div>
            )}
        </div>

    )
}
