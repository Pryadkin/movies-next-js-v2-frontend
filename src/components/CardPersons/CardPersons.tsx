/* eslint-disable max-len */
import {IPersonDetailsWithLang} from '@/api/apiTypes/responseArtistDetails'

import {CardPerson} from '../CardPerson/CardPerson'
import {Spin} from '../Spin'

import styles from './CardPersons.module.scss'

interface Props {
    persons: IPersonDetailsWithLang[]
    isFetching: boolean,
    isProfileCard?: boolean,
}

export const CardPersons: React.FC<Props> = ({
    persons,
    isFetching,
}) => {
    if (isFetching) return <Spin />

    return (
        <div className={styles.wrapper}>
            {persons
                ? (
                    persons.map(person => {
                        const width = 200
                        const height = 350
                        return (
                            <CardPerson
                                key={person.id}
                                person={person}
                                width={width}
                                height={height}
                            />
                        )}
                    )
                )
                : (
                    null
                )
            }
        </div>
    )
}
