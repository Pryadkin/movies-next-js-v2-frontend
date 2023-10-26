/* eslint-disable max-len */
import {useState} from 'react'
import {useSelector} from 'react-redux'

import {IMovie, IMovieLang} from '@/api/apiTypes'
import {getCurrentMovie} from '@/redux/selectors'

import {Card} from '../Card/Card'

import styles from './CardItems.module.scss'

import {ModelAddMovie} from '../ModelAddMovie'
import {Spin} from '../Spin'

interface Props {
    data: (IMovieLang | IMovie)[]
    isFetching: boolean,
    isProfileCard?: boolean,
}

export const CardItems: React.FC<Props> = ({
    data,
    isFetching,
    isProfileCard,
}) => {
    const currentMovie = useSelector(getCurrentMovie)
    const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false)

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
                                currentMovie={currentMovie}
                                width={width}
                                height={height}
                                onModalOpen={setIsAddMovieModalOpen}
                                isProfileCard={isProfileCard}
                            />
                        )}
                    )
                )
                : (
                    null
                )
            }

            {currentMovie && (
                <ModelAddMovie
                    movie={currentMovie as IMovie}
                    isModalOpen={isAddMovieModalOpen}
                    onModalCancel={() => setIsAddMovieModalOpen(false)}
                />
            )}
        </div>
    )
}
