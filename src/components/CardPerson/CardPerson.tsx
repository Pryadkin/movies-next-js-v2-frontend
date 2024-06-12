import {useDispatch} from "react-redux"

import {IPerson} from "@/api/apiTypes/requestPerson"
import {IArtistDetails, IPersonDetailsWithLang} from "@/api/apiTypes/responseArtistDetails"
import {setModelContent, setSelectPerson} from "@/redux/reducers"

import styles from './CardPerson.module.scss'

interface Props {
    person: IPersonDetailsWithLang | IArtistDetails | IPerson,
    width: number,
    height: number
}

export const CardPerson = ({
    person,
    width,
    height
}: Props) => {
    const dispatch = useDispatch()

    console.log('person', person)

    const handleCardClick = () => {
        dispatch(setModelContent({
            type: 'artist',
            id: person.id
        }))
        dispatch(setSelectPerson(person))
    }

    const name = (person as IArtistDetails)?.name || (person as IPersonDetailsWithLang)?.name_ru

    return (
        <div
            key={person.id}
            className={styles.item}
            onClick={handleCardClick}
            style={{width, height}}
        >
            <img
                className={styles.image}
                src={person.profile_path}
                alt={name}
            />
            <h3 className={styles.name}>
                {name}
            </h3>
        </div>
    )
}