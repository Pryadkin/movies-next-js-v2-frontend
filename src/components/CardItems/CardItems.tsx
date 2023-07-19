/* eslint-disable max-len */
import {IMovie} from '@/api/apiTypes'

import {CardItem} from '../CardItem'
import {Spin} from '../Spin'

import styles from './CardItems.module.scss'



interface Props {
    data: IMovie[] | undefined,
    isFetching: boolean,
    isProfileCard?: boolean,
}

export const CardItems: React.FC<Props> = ({
    data,
    isFetching,
    isProfileCard,
}) => {
    if (isFetching) return <Spin />

    return (
        <div className={styles.wrapper}>
            {data
                ? (
                    data.map(movie => {
                        const width = 240
                        const height = 450
                        return (
                            <CardItem
                                key={movie.id}
                                movie={movie}
                                width={width}
                                height={height}
                                isProfileCard={isProfileCard}
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
