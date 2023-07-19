import {FC} from 'react'

import {Button, Card} from 'antd'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes'
import {addMovieThunk} from '@/redux/reducers'
import {deleteMovieThunk} from '@/redux/reducers/profileReducer'
import {useAppDispatch} from '@/redux/store'

import styles from './CardItem.module.scss'

const {Meta} = Card

interface Props {
    movie: IMovie,
    width: number,
    height: number,
    isProfileCard?: boolean,
}

export const CardItem: FC<Props> = ({
    movie,
    width,
    height,
    isProfileCard,
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
    )
}