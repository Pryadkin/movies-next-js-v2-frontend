import {FC} from 'react'

import {Button, Card} from 'antd'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes'
import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {useSaveMovie} from '@/hooks/useSaveMovie'

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
    const {mutationSave} = useSaveMovie()
    const {mutationDelete} = useDeleteMovie()

    const handleAddBtnClick = (movie: IMovie) => () => {
        mutationSave.mutate(movie)
    }
    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
    }

    const button = () => {
        if (isProfileCard) {
            return (
                <Button
                    type="default"
                    className={styles.btn}
                    onClick={handleRemoveBtnClick(movie.id)}
                >
                remove
                </Button>
            )
        }
        return (
            <Button
                type="default"
                className={styles.btn}
                onClick={handleAddBtnClick(movie)}
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

            {button()}

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