import {useSelector} from "react-redux"

import {useFetchPopular} from "@/hooks/useFetchPopular"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

import styles from './Popular.module.scss'

const Popular = () => {
    const lang = useSelector(getSelectLanguage)
    const {
        data,
        isFetching
    } = useFetchPopular(lang)
    return (
        <div className={styles.wrapper}>
            {data && data.map(item => (
                <div
                    key={item.id}
                    className={styles.itemWrapper}
                >
                    <img src={item.profile_path} alt={item.name} />
                    <h3>{item.name}</h3>
                </div>

            ))}
        </div>
    )
}

export default Popular