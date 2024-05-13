/* eslint-disable max-len */
import {TMovie} from '@/api/apiTypes/requestMovies'
import {setIsAddMovieModalOpen} from '@/redux/reducers'
import {useAppDispatch} from '@/redux/store'

import styles from './CardItems.module.scss'

import {Card} from '../Card/Card'
import {Spin} from '../Spin'


interface Props {
    data: TMovie[]
    isFetching: boolean,
    isProfileCard?: boolean,
}

export const CardItems: React.FC<Props> = ({
    data,
    isFetching,
    isProfileCard,
}) => {
    const dispatch = useAppDispatch()

    if (isFetching) return <Spin />

    return (
        <div className={styles.wrapper}>
            {data
                ? (
                    data.map(movie => {
                        const width = 200
                        const height = 300
                        return (
                            <Card
                                key={movie.id}
                                movie={movie}
                                width={width}
                                height={height}
                                onModalOpen={() => dispatch(setIsAddMovieModalOpen(true))}
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
