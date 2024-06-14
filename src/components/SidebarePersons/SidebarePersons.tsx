import {FC} from "react"
import {useSelector} from "react-redux"

import {
    Button,
} from "antd"
import {useRouter} from 'next/router'

import {TGender, TPersonKnownDepartment} from "@/api/apiTypes/requestPerson"
import {setPopularitySort} from "@/redux/reducers"
import {setGenderFilter, setKnownDepartmentFilter} from "@/redux/reducers/profilePersonReducer/profilePersonSlice"
import {getPopularitySort} from "@/redux/selectors"

import styles from './SidebarePersons.module.scss'

import {useAppDispatch} from "@/redux/store"


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

    const handleGenderFilterClick = (gender: TGender) => () => {
        dispatch(setGenderFilter(gender))
    }

    const handleKnownDepartmentFilterClick = (
        knownDepartment: TPersonKnownDepartment
    ) => () => {
        dispatch(setKnownDepartmentFilter(knownDepartment))
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
                onClick={handleGenderFilterClick(2)}
            >
                MALE
            </Button>
            <Button
                className={styles.btn}
                size="small"
                onClick={handleGenderFilterClick(1)}
            >
                FEMALE
            </Button>
            <Button
                className={styles.btn}
                size="small"
                onClick={handleGenderFilterClick(0)}
            >
                ALL
            </Button>

            <hr />

            <Button
                className={styles.btn}
                size="small"
                onClick={handleKnownDepartmentFilterClick('Acting')}
            >
                ACTING
            </Button>
            <Button
                className={styles.btn}
                size="small"
                onClick={handleKnownDepartmentFilterClick('Directing')}
            >
                DIRECTING
            </Button>
            <Button
                className={styles.btn}
                size="small"
                onClick={handleKnownDepartmentFilterClick('All')}
            >
                ALL
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