import React from 'react'

import {Card} from 'antd'
import Image from 'next/image'

import {ISearchMoviesResults} from '@/pages/api/apiTypes/requestMovies'

import styles from './CardItems.module.scss'

const {Meta} = Card

export const CardItems = ({movies}: {movies: ISearchMoviesResults[]}) => {
    console.log(movies)
    const getMinText = (text: string) => {
        return `${text.slice(0, 50)} ...`
    }
    return (
        <div className={styles.wrapper}>
            {movies.length
                ? (
                    movies.map(movie => (
                        <Card
                            key={movie.id}
                            className={styles.card}
                            hoverable
                            style={{width: 240}}
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
                    ))
                )
                : (
                    null
                )
            }

        </div>
    )
}
