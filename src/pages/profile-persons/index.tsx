import {useSelector} from "react-redux"

import {CardPersons} from "@/components/CardPersons"
import {useFetchProfilePersons} from "@/hooks/useFetchProfilePersons"
import {getPopularitySort} from "@/redux/selectors"

import styles from './Profile.module.scss'

const ProfilePersons = () => {
    const popularitySort = useSelector(getPopularitySort)
    const {data, isFetching} = useFetchProfilePersons(popularitySort)

    return (
        <div className={styles.profileWrapper}>
            {data &&
                <CardPersons
                    persons={data}
                    isFetching={isFetching}
                />
            }
        </div>
    )
}

export default ProfilePersons
