import {useDispatch} from "react-redux"

import {IPersonWithoutLang} from "@/api/apiTypes/requestPerson"
import {setModelContent, setSelectPerson} from "@/redux/reducers"

import styles from './CardPerson.module.scss'

interface Props {
    data: IPersonWithoutLang
}

export const CardPerson = ({data}: Props) => {
    const dispatch = useDispatch()

    const handleCardClick = () => {
        dispatch(setModelContent({
            type: 'artist',
            id: data.id
        }))
        dispatch(setSelectPerson(data))
    }

    return (
        <div
            key={data.id}
            className={styles.item}
            onClick={handleCardClick}
        >
            <img
                className={styles.image}
                src={data.profile_path}
                alt={data.name}
            />
            <h3 className={styles.name}>
                {data.name}
            </h3>
        </div>
    )
}