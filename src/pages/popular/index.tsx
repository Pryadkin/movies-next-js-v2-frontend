import {useSelector} from "react-redux"

import {IPopular} from "@/api/apiTypes/requestPopular"
import {useFetchPopular} from "@/hooks/useFetchPopular"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

import styles from './Popular.module.scss'

const Popular = () => {
    const lang = useSelector(getSelectLanguage)
    const {
        data,
    } = useFetchPopular(lang)

    const handleItemClick = (artist: IPopular) => () => {
        console.log('artist', artist)
    }

    return (
        <div className={styles.wrapper}>
            {data && data.map(item => (
                <div
                    key={item.id}
                    className={styles.itemWrapper}
                    onClick={handleItemClick(item)}
                >
                    <img
                        src={item.profile_path}
                        alt={item.name}
                    />
                    <h3>{item.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default Popular