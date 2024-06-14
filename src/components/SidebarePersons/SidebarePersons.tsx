import {FC} from "react"
import {useSelector} from "react-redux"

import {
    Button,
} from "antd"
import {useRouter} from 'next/router'

import {setPopularitySort} from "@/redux/reducers"
import {getPopularitySort} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"

import styles from './SidebarePersons.module.scss'

interface Props {
    onModalOpen: (value: boolean) => void
}

export const SidebarePersons: FC<Props> = () => {
    const dispatch = useAppDispatch()
    const {push} = useRouter()
    const popularitySort = useSelector(getPopularitySort)

    const handlePopularitySortBtn = () => {
        const sortType = popularitySort === 'asc' ? 'desc' : 'asc'
        dispatch(setPopularitySort(sortType))
    }

    return (
        <div className={styles.wrapper}>
            <Button
                className={styles.btn}
                size="small"
                onClick={() => push('profile-movies')}
            >
                MOVIES
            </Button>

            <Button
                className={styles.btn}
                size="small"
                onClick={() => push('profile-persons')}
            >
                PERSONS
            </Button>

            <hr />

            <Button
                className={styles.btn}
                size="small"
                onClick={handlePopularitySortBtn}
            >
                Sort by popularity
            </Button>
        </div>
    )
}