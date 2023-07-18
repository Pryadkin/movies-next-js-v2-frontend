/* eslint-disable max-len */
import {Button, Card} from 'antd'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes/requestMovies'
import {addMovieThunk, deleteMovieThunk} from '@/redux/reducers/profileReducer'
import {useAppDispatch} from '@/redux/store/rootReducer'

import styles from './CardItems.module.scss'


const {Meta} = Card

interface Props {
    movies: IMovie[],
    isProfileCard?: boolean,
}

// https://image.tmdb.org/t/p/w300/gt7kD8MjObtgQYH130pZiLTN0qx.jpg



export const CardItems: React.FC<Props> = ({
    movies,
    isProfileCard
}) => {
    const dispatch = useAppDispatch()
    const handleAddBtnClick = (movie: IMovie) => () => {
        dispatch(addMovieThunk(movie))
    }
    const handleRemoveBtnClick = (movie: IMovie) => () => {
        dispatch(deleteMovieThunk(movie.id))
    }

    const button = (mov: IMovie) => {
        if (isProfileCard) {
            return (
                <Button
                    type="default"
                    className={styles.btn}
                    onClick={handleRemoveBtnClick(mov)}
                >
                    remove
                </Button>
            )
        }
        return (
            <Button
                type="default"
                className={styles.btn}
                onClick={handleAddBtnClick(mov)}
            >
                add
            </Button>
        )
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

                                {button(movie)}

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
                                        movie?.poster_path && (
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
