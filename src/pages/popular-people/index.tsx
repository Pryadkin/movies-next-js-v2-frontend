import {useSelector} from "react-redux"

import styles from './PopularPeople.module.scss'

import {useFetchPopular} from "@/hooks/useFetchPopular"
import {setModelContent} from "@/redux/reducers"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {useAppDispatch} from "@/redux/store"

const PopularPeople = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const {
        data,
    } = useFetchPopular(lang)

    return (
        <div className={styles.wrapper}>
            {data && data.map(item => (
                <div
                    key={item.id}
                    className={styles.itemWrapper}
                    onClick={() => {
                        dispatch(setModelContent({
                            type: 'artist',
                            id: item.id
                        }))
                    }}
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

export default PopularPeople