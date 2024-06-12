import {CardPersons} from "@/components/CardPersons"
import {useFetchProfilePersons} from "@/hooks/useFetchProfilePersons"

import styles from './Profile.module.scss'

const ProfilePersons = () => {
    const {data, isFetching} = useFetchProfilePersons()

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
