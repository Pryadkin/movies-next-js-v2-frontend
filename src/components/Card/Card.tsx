import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {Button, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'
import {useRouter} from 'next/router'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'

import styles from './Card.module.scss'

import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {getIsDrawerMovieTagsOpen, setModelContent, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {TMovieType} from '@/types'

export const Card = ({
    movie,
    width,
    height,
    isProfileCard,
    onModalOpen
}: {
    movie: ICorrectMovieWithoutLang | ICorrectMovieWithLang,
    width: number,
    height: number,
    isProfileCard: boolean | undefined,
    onModalOpen: (val: boolean) => void
}) => {
    const router = useRouter()
    const cardRef = useRef<HTMLDivElement>(null)
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
        dispatch(setSelectMovie(movie))
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

    const handleFilterBtnClick = () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
    }

    const handleMovieDetailsShowClick = (mov: ICorrectMovieWithoutLang | ICorrectMovieWithLang) => () => {
        const movieType: TMovieType = mov.settings.isTv ? 'tv' : 'movie'
        router.push(`/movies/${movieType}/${mov.id}`)
    }


    const button = () => {
        if (isProfileCard) {
            return (
                <>
                    <Button
                        type="default"
                        className={clsx(styles.btn, styles.btnFilter)}
                        onClick={handleMovieDetailsShowClick(movie)}
                    >
                        Movie Details
                    </Button>
                    <Button
                        type="default"
                        className={clsx(styles.btn, styles.btnFilter)}
                        onClick={handleFilterBtnClick}
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

    const handleDetailsClick = (mov: ICorrectMovieWithLang | ICorrectMovieWithoutLang) => () => {
        dispatch(setSelectMovie(mov))
        dispatch(setModelContent({
            type: mov.settings.isTv ? 'tv' : 'movie',
            id: mov.id
        }))
    }

    const getCard = (movie: ICorrectMovieWithoutLang | ICorrectMovieWithLang) => {
        const isEnglish = lang === 'en-EN'
        const movieWithoutLang = movie as ICorrectMovieWithoutLang
        const movieWithLang = movie as ICorrectMovieWithLang

        const langTitle = isEnglish
            ? movieWithLang.title_en
            : movieWithLang.title_ru
        const langPosterPath = isEnglish
            ? movieWithLang.poster_path_en
            : movieWithLang.poster_path_ru

        const title = langTitle || movieWithoutLang.title
        const posterPath = langPosterPath || movieWithoutLang.poster_path

        return (
            <>
                <div
                    data-title={getTitle(title)}
                    className={styles.front}
                >
                    {isMouseOver && (
                        <div
                            className={styles.details}
                            onClick={handleDetailsClick(movie)}
                        >
                            DETAILS
                        </div>
                    )}

                    {movie?.settings?.isTv && (
                        <div className={styles.tvLabel}>TV</div>
                    )}
                    <img
                        style={{
                            marginTop: 10
                        }}
                        alt={title || ''}
                        src={posterPath || ''}
                        width={width}
                        height={height}
                    />
                    {/* <Image
                        style={{
                            marginTop: 10
                        }}
                        alt={title || ''}
                        src={posterPath || ''}
                        width={width}
                        height={height}
                        blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                        placeholder="blur"
                    /> */}
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
                    {getCard(movie)}
                </div>
            </div>
        </div>
    )
}