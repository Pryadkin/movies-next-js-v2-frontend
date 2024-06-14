import {useSelector} from "react-redux"

import {CardPersons} from "@/components/CardPersons"
import {useFetchProfilePersons} from "@/hooks/useFetchProfilePersons"
import {getPopularitySort} from "@/redux/selectors"
import {getGenderFilter, getKnownDepartmentFilter} from "@/redux/selectors/profilePersonsSelectors"

import styles from './Profile.module.scss'

const ProfilePersons = () => {
    const popularitySort = useSelector(getPopularitySort)
    const genderFilter = useSelector(getGenderFilter)
    const knownDepartmentFilter = useSelector(getKnownDepartmentFilter)
    const {data, isFetching} = useFetchProfilePersons({
        popularitySort,
        genderFilter,
        knownDepartmentFilter,
    })

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
