/* eslint-disable max-len */
import React, {SyntheticEvent} from 'react'

import {Button, Card} from 'antd'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes/requestMovies'
import imagePlaceholder from '@/assents/images/placeholder-2-500x400.jpeg'
import {addMovie} from '@/redux/reducers'
import {useAppDispatch} from '@/redux/store/rootReducer'

import styles from './CardItems.module.scss'

const {Meta} = Card

interface Props {
    movies: IMovie[]
}

// https://image.tmdb.org/t/p/w300/gt7kD8MjObtgQYH130pZiLTN0qx.jpg



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
                        console.log('movie', movie)
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
                                        // <img
                                        //     alt={movie.title}
                                        //     src={(movie.poster_path as string)}
                                        //     width={300}
                                        // />
                                        movie.poster_path && (
                                            <Image
                                                alt={movie.title}
                                                src={movie.poster_path}
                                                width={240}
                                                height={360}
                                                blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                                                placeholder="blur"
                                            />
                                        )

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
