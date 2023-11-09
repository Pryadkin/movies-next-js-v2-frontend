import {IMultiMovie} from "@/api/apiTypes/requestMovies"
import {setModelContent} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './Credit.module.scss'

export const Credit = ({credit}: {credit: IMultiMovie}) => {
    const dispatch = useAppDispatch()

    return (
        <div
            className={styles.creditItem}
            title={credit.title}
            onClick={() => {
                dispatch(setModelContent({
                    type: credit?.settings?.isTv ? 'tv' : 'movie',
                    id: credit.id
                }))
            }}
        >
            <img
                src={credit.poster_path_ru}
                alt={credit.title}
            />
        </div>
    )
}
