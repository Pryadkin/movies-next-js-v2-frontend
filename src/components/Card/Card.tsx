import {useState} from 'react'
import {useSelector} from 'react-redux'

import {Button, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'
import {useRouter} from 'next/router'

import {IMovie, IMovieLang, ITv} from '@/api/apiTypes'

import styles from './Card.module.scss'

import {isIMovie, isIMovieLang} from '@/helpers'
import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {getIsDrawerMovieTagsOpen, setCurrentMovie, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

export const Card = ({
    movie,
    width,
    height,
    currentMovie,
    isProfileCard,
    onModalOpen
}: {
    movie: IMovie | IMovieLang,
    width: number,
    height: number,
    currentMovie: IMovie | IMovieLang | null,
    isProfileCard: boolean | undefined,
    onModalOpen: (val: boolean) => void
}) => {
    const rounter = useRouter()
    const isCurMovie = currentMovie && currentMovie.id === movie.id
    const [isRotate, setIsRotate] = useState(false)

    const handleCardClick= () => {
        setIsRotate(!isRotate)

        dispatch(setCurrentMovie((movie as IMovie)))
    }

    const dispatch = useAppDispatch()
    const {mutationDelete} = useDeleteMovie()
    const lang = useSelector(getSelectLanguage)
    const handleAddBtnClick = (e: any) => {
        e.stopPropagation()
        onModalOpen(true)
    }

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
    }

    const handleFilterBtnClick = (movieId: number) => () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        dispatch(setSelectMovie(movieId))
    }

    const button = () => {
        if (isProfileCard) {
            return (
                <>
                    <Button
                        type="default"
                        className={clsx(styles.btn, styles.btnFilter)}
                        onClick={handleFilterBtnClick(movie.id)}
                    >
                        SETTINGS
                    </Button>

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

    const addLangButton = () => {
        if (isIMovieLang(movie)) {
            return <Button
                type="default"
                size='small'
                className={clsx(styles.btn, styles.btnLang)}
                onClick={(e: any) => {
                    e.stopPropagation()
                    onModalOpen(true)
                }}
            >
                ADD LAND
            </Button>
        }
    }

    const getTitle = (title: string | null) => {
        const numberWords = 20
        if (title) {
            return title.length > numberWords
                ? `${title.slice(0, numberWords)}...`
                : title
        } else {
            return null
        }
    }

    const handleDetailsClick = (mov: IMovie | ITv | IMovieLang) => () => {
        if ((mov as ITv).settings?.isTv) {
            rounter.push(`movies/tv/${movie.id}`)
        } else {
            rounter.push(`movies/mov/${movie.id}`)
        }
    }

    const getCard = () => {
        if (isIMovie(movie)) {
            return (
                <>
                    <div
                        data-title={movie.title}
                        title={movie.title}
                        className={styles.front}
                    >
                        <Image
                            className={styles.image}
                            title={movie.title}
                            alt={movie.title}
                            src={movie.poster_path || ''}
                            width={width}
                            height={height}
                            blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                            placeholder="blur"
                        />
                        <p className={styles.title}>
                            {getTitle(movie.title)}
                        </p>
                        <p className={styles.title}>
                            {movie.release_date}
                        </p>

                    </div>
                    <div className={styles.back}>
                        <p className={styles.backTitle}>
                            {movie.title}
                        </p>

                        <p className={styles.backTitle}>
                            {movie.release_date}
                        </p>

                        <p className={styles.backTitle}>
                                popularity - {movie.popularity}
                        </p>

                        <div
                            onClick={handleDetailsClick(movie)}
                            className={styles.ditailsLink}
                        >
                            Details
                        </div>

                        {button()}
                    </div>
                </>
            )
        }
        if (isIMovieLang(movie)) {
            const isEnglish = lang === 'en-EN'
            const title = isEnglish ? movie.title_en : movie.title_ru
            const poster_path = isEnglish
                ? movie.poster_path_en
                : movie.poster_path_ru

            return (
                <>
                    <div
                        data-title={getTitle(title)}
                        className={styles.front}
                    >
                        <Image
                            alt={title || ''}
                            src={poster_path || ''}
                            width={width}
                            height={height}
                            blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                            placeholder="blur"
                        />
                        <p className={styles.title}>
                            {getTitle(title)}
                        </p>
                        <p className={styles.title}>
                            {movie.release_date}
                        </p>

                    </div>
                    <div className={styles.back}>
                        <p className={styles.backTitle}>
                            {title}
                        </p>

                        <p className={styles.backTitle}>
                            {movie.release_date}
                        </p>

                        <p className={styles.backTitle}>
                            popularity - {movie.popularity}
                        </p>

                        <div
                            onClick={handleDetailsClick(movie)}
                            className={styles.ditailsLink}
                        >
                            Details
                        </div>

                        {button()}
                        {addLangButton()}
                    </div>
                </>
            )
        }

        return null
    }

    return (
        <div
            key={movie.id}
            className={clsx(styles.cardsWrapper, isRotate && isCurMovie &&styles.rotate)}
            onClick={handleCardClick}
        >
            <div className={styles.card}>
                <div className={styles.content}>
                    {getCard()}
                </div>
            </div>
        </div>
    )
}