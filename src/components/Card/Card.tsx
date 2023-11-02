import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {Button, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes'
import {ICorrectMovie} from '@/api/apiTypes/requestMovies'
import {useDeleteMovie} from '@/hooks/useDeleteMovie'

import styles from './Card.module.scss'

import {getIsDrawerMovieTagsOpen, sestIsModalDetailsOpen, setCurrentMovie, setSelectMovie} from '@/redux/reducers'
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
    movie: IMovie | ICorrectMovie,
    width: number,
    height: number,
    currentMovie: IMovie | null,
    isProfileCard: boolean | undefined,
    onModalOpen: (val: boolean) => void
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    // const isCurMovie = currentMovie && currentMovie.id === movie.id
    const [isRotate, setIsRotate] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)

    useEffect(() => {
        const handleClickOutside = ({target}: MouseEvent) => {
            if (target instanceof HTMLElement) {
                if (cardRef.current?.contains(target)) {
                    const isHTMLImageElem = target instanceof HTMLImageElement

                    const isCorrectBody = isHTMLImageElem
                        ? Boolean(target.alt)
                        : Boolean(target.dataset.title)

                    setIsRotate(isCorrectBody)
                } else {
                    setIsRotate(false)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
        }

    }, [cardRef])

    const handleCardClick = () => {
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

    const handleDetailsClick = () => {
        dispatch(sestIsModalDetailsOpen(true))
    }

    const getCard = () => {
        const isEnglish = lang === 'en-EN'
        const isMovieLangKey = Boolean((movie as ICorrectMovie).title_en)
        const correctMovie = movie as ICorrectMovie

        const lang_title = isEnglish
            ? correctMovie.title_en
            : correctMovie.title_ru
        const lang_poster_path = isEnglish
            ? correctMovie.poster_path_en
            : correctMovie.poster_path_ru

        const title = isMovieLangKey
            ? lang_title
            : (movie as IMovie).title
        const poster_path = isMovieLangKey
            ? lang_poster_path
            : (movie as IMovie).poster_path

        return (
            <>
                <div
                    data-title={getTitle(title)}
                    className={styles.front}
                >
                    {isMouseOver && (
                        <div
                            className={styles.details}
                            onClick={handleDetailsClick}
                        >
                            DETAILS
                        </div>
                    )}

                    {movie.settings.isTv && (
                        <div className={styles.tvLabel}>TV</div>
                    )}
                    <Image
                        style={{
                            marginTop: 10
                        }}
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

                    {button()}
                </div>
            </>
        )
    }

    return (
        <div
            key={movie.id}
            ref={cardRef}
            data-index={movie.id}
            className={clsx(
                styles.cardsWrapper,
                isRotate && styles.rotate
            )}
            onClick={handleCardClick}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div className={styles.card} data-index={movie.id}>
                <div className={styles.content} data-index={movie.id}>
                    {getCard()}
                </div>
            </div>
        </div>
    )
}