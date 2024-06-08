import {useDispatch} from "react-redux"

import {IPerson} from "@/api/apiTypes/requestPerson"
import {setModelContent} from "@/redux/reducers"

import styles from './CardPerson.module.scss'

interface Props {
    data: IPerson
}

export const CardPerson = ({data}: Props) => {
    const dispatch = useDispatch()
    return (
        <div
            key={data.id}
            className={styles.item}
            onClick={() => {
                dispatch(setModelContent({
                    type: 'artist',
                    id: data.id
                }))
            }}
        >
            <img
                className={styles.image}
                src={data.profile_path}
                alt={data.name}
            />
            <h3 className={styles.name}>{data.name}</h3>
        </div>
    )
}