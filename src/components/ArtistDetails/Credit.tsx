import {useState} from "react"

import {IMultiMovie} from "@/api/apiTypes/requestMovies"
import {setArtistToModelContent, setMovieToModelContent} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './ArtistDetails.module.scss'

export const Credit = ({credit}: {credit: IMultiMovie}) => {
    const dispatch = useAppDispatch()
    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <div
            className={styles.creditItem}
            onClick={() => {
                dispatch(setMovieToModelContent(credit.id))
                dispatch(setArtistToModelContent(null))
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
