import React, {SyntheticEvent} from 'react'

import {Button, Card} from 'antd'
import Image from 'next/image'

import {addMovie} from '@/modules/reducers'
import {useAppDispatch} from '@/modules/store/rootReducer'
import {IMovie} from '@/pages/api/apiTypes/requestMovies'

import styles from './CardItems.module.scss'

const {Meta} = Card

interface Props {
    movies: IMovie[]
}

export const CardItems: React.FC<Props> = ({movies}) => {
    const dispatch = useAppDispatch()
    const handleAddBtnClick = (movie: IMovie) => () => {
        dispatch(addMovie(movie))
    }

    return (
        <div className={styles.wrapper}>
            {movies.length
                ? (
                    movies.map(movie => {
                        const width = 240
                        const height = 450
                        return (
                            <div
                                key={movie.id}
                                className={styles.cardWrapper}
                            >
                                <div
                                    style={{width, height}}
                                    className={styles.background}
                                />
                                <Button
                                    type="default"
                                    className={styles.btn}
                                    onClick={handleAddBtnClick(movie)}
                                >
                                    add
                                </Button>
                                <Card
                                    className={styles.card}
                                    hoverable
                                    style={{width, height}}
                                    cover={
                                        <img
                                            alt={movie.title}
                                            src={(movie.poster_path as string)}
                                        />
                                    }
                                >
                                    <Meta
                                        title={movie.title}
                                        // description={getMinText(movie.overview)}
                                        description={movie.release_date}
                                    />
                                </Card>
                            </div>
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
