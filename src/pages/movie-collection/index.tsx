import {useSelector} from "react-redux"

import styles from './Popular.module.scss'

import {useFetchPopular} from "@/hooks/useFetchPopular"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {useAppDispatch} from "@/redux/store"

const MovieCollection = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const {
        data,
    } = useFetchPopular(lang)

    return (
        <div className={styles.wrapper}>
            
        </div>
    )
}

export default MovieCollection