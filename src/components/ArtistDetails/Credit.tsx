import {useState} from "react"

import {IMovie, IMultiMovie} from "@/api/apiTypes/requestMovies"
import {sestIsModalDetailsOpen, setCurrentMovie} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './ArtistDetails.module.scss'

export const Credit = ({credit}: {credit: IMultiMovie}) => {
    const dispatch = useAppDispatch()
    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <div
            className={styles.creditItem}
            onClick={() => {
                dispatch(setCurrentMovie(credit as unknown as IMovie))
                dispatch(sestIsModalDetailsOpen(true))
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
