import {FC} from 'react'
import {useSelector} from 'react-redux'

import {Button, Card, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

import {TMovie} from '@/api/apiTypes'
import {isMovieWithoutLang} from "@/helpers"

import styles from './CardItem.module.scss'

import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {getIsDrawerMovieTagsOpen, setIsAddMovieModalOpen} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

const {Meta} = Card

interface Props {
    movie: TMovie,
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

    const handleAddBtnClick = () => {
        dispatch(setIsAddMovieModalOpen(true))
    }

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
    }

    const handleFilterBtnClick = () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
    }

    const getCard = (mov: TMovie) => {

        if (isMovieWithoutLang(mov)) {
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
                        description={movie.release_date}
                    />
                </Card>
            )
        }

        if (isMovieWithoutLang(mov)) {
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
                        description={mov.release_date}
                    />
                </Card>
            )
        }
    }

    const addLangButton = (mov: TMovie) => {
        if (isMovieWithoutLang(mov)) {
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
                        onClick={handleFilterBtnClick}
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

            {movie && getCard(movie)}
        </div>
    )
}