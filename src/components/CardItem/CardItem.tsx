import {FC, useState} from 'react'
import {useSelector} from 'react-redux'

import {Button, Card, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

import {IMovie, IMovieLang} from '@/api/apiTypes'
import {isIMovie, isIMovieLang} from "@/helpers"
import {useDeleteMovie} from '@/hooks/useDeleteMovie'

import styles from './CardItem.module.scss'

import {getIsDrawerMovieTagsOpen, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

import {ModelAddMovie} from '../ModelAddMovie'

const {Meta} = Card

interface Props {
    movie: IMovieLang | IMovie,
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
    const lang = useSelector(getSelectLanguage)
    const {mutationDelete} = useDeleteMovie()
    const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false)

    const handleAddBtnClick = () => {
        setIsAddMovieModalOpen(true)
    }

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
    }

    const handleFilterBtnClick = (movieId: number) => () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        dispatch(setSelectMovie(movieId))
    }

    const getCard = (mov: IMovie | IMovieLang) => {

        if (isIMovie(mov)) {
            return (
                <Card
                    className={styles.card}
                    hoverable
                    style={{width, height}}
                    cover={
                        <Image
                            alt={mov.title}
                            src={mov.poster_path || ''}
                            width={240}
                            height={360}
                            blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                            placeholder="blur"
                        />
                    }
                >
                    <Meta
                        title={mov.title}
                        // description={getMinText(movie.overview)}
                        description={movie.release_date}
                    />
                </Card>
            )
        }

        if (isIMovieLang(mov)) {
            const isEnglish = lang === 'en-EN'
            const title = isEnglish ? mov.title_en : mov.title_ru
            const poster_path = isEnglish
                ? mov.poster_path_en
                : mov.poster_path_ru

            return (
                <Card
                    className={styles.card}
                    hoverable
                    style={{width, height}}
                    cover={
                        <Image
                            alt={title || ''}
                            src={poster_path || ''}
                            width={240}
                            height={360}
                            blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                            placeholder="blur"
                        />
                    }
                >
                    <Meta
                        title={title}
                        // description={getMinText(movie.overview)}
                        description={mov.release_date}
                    />
                </Card>
            )
        }
    }

    const addLangButton = (mov: IMovie | IMovieLang) => {
        if (isIMovieLang(mov)) {
            return <Button
                type="default"
                size='small'
                className={clsx(styles.btn, styles.btnLang)}
                onClick={() => setIsAddMovieModalOpen(true)}
            >
                ADD LAND
            </Button>
        }
    }

    const button = () => {
        if (isProfileCard) {
            return (
                <>
                    <Popconfirm
                        title="Delete the movie"
                        description="Are you sure to delete this movie?"
                        onConfirm={handleRemoveBtnClick(movie.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="default"
                            className={clsx(styles.btn, styles.btnRemove)}
                        >
                            remove
                        </Button>
                    </Popconfirm>

                    <Button
                        type="default"
                        className={clsx(styles.btn, styles.btnFilter)}
                        onClick={handleFilterBtnClick(movie.id)}
                    >
                        SETTINGS
                    </Button>
                </>
            )
        }
        return (
            <Button
                type="default"
                className={styles.btn}
                onClick={handleAddBtnClick}
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

            {addLangButton(movie)}

            {getCard(movie)}

            <ModelAddMovie
                movie={movie as IMovie}
                isModalOpen={isAddMovieModalOpen}
                onModalCancel={() => setIsAddMovieModalOpen(false)}
            />
        </div>
    )
}