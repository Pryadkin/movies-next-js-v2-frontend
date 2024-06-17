import cn from 'clsx'

import {ICorrectMovieWithoutLang} from "@/api/apiTypes/requestMovies"
import {useFetchMovieIds} from "@/hooks/useFetchMovieIds"
import {setModelContent, setSelectMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './Credit.module.scss'

export const Credit = ({credit}: {credit: ICorrectMovieWithoutLang}) => {
    const dispatch = useAppDispatch()
    const {movieIdsData} = useFetchMovieIds()
    const isOldMovie = movieIdsData?.includes(credit.id)

    return (
        <div
            className={cn(styles.creditItem, isOldMovie && styles.oldMovies)}
            title={credit.title}
            onClick={() => {
                dispatch(setModelContent({
                    type: credit?.settings?.isTv ? 'tv' : 'movie',
                    id: credit.id
                }))
                dispatch(setSelectMovie(credit))
            }}
        >
            <img
                src={credit.poster_path}
                alt={credit.title}
            />
            <div className={styles.title}>{credit.title}</div>
        </div>
    )
}
