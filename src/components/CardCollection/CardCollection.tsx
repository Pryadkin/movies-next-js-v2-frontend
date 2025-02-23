import {useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {CloseCircleOutlined} from '@ant-design/icons'
import clsx from 'clsx'
import {useRouter} from 'next/router'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {useFetchMovieIds} from '@/hooks/useFetchMovieIds'

import styles from './CardCollection.module.scss'

import {setModelContent, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import { Input, Popconfirm } from 'antd'
import { CardEmpty } from './CardEmpty'

export const CardCollection = ({
    movie,
    width,
    height,
    movieName,
    onAddMovieToCard,
    onDeleteMovieFromCard,
    onRenameCard,
    onDeleteCard,
    onCardClick,
}: {
    movie: ICorrectMovieWithoutLang | ICorrectMovieWithLang | null,
    width: number,
    height: number,
    movieName?: string,
    onAddMovieToCard?: () => void
    onDeleteMovieFromCard?: () => void
    onRenameCard?: (val: string) => void
    onDeleteCard?: () => void
    onCardClick?: (val: ICorrectMovieWithLang) => void
}) => {
    const router = useRouter()
    const cardRef = useRef<HTMLDivElement>(null)

    const {movieIdsData} = useFetchMovieIds()
    const isOldMovie = router.pathname !== '/profile-movies' ? movie && movieIdsData?.includes(movie.id) : false

    const handleCardClick = () => {
        console.log('movie', movie)
        onCardClick && onCardClick(movie as ICorrectMovieWithLang)
    }

    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)

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
                    className={clsx(styles.front, isOldMovie && styles.oldMovie)}
                >
                    <div
                        className={styles.details}
                        onClick={handleDetailsClick(movie)}
                    >
                        DETAILS
                    </div>

                    <Popconfirm
                        title="Delete the movie"
                        description="Are you sure to delete this Movie?"
                        onConfirm={() => onDeleteMovieFromCard && onDeleteMovieFromCard()}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div
                            className={styles.remove}
                        >
                            <CloseCircleOutlined rev={undefined} />
                        </div>
                    </Popconfirm>

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
                    <p className={styles.title}>
                        {getTitle(title)}
                    </p>
                    <p className={styles.title}>
                        {movie.release_date}
                    </p>
                </div>
            </>
        )
    }

    if (movie) return (
        <div
            key={movie.id}
            ref={cardRef}
            data-index={movie.id}
            className={clsx(
                styles.cardsWrapper
            )}
            onClick={handleCardClick}
        >
            <div className={styles.card} data-index={movie.id}>
                <div className={styles.content} data-index={movie.id}>
                    {getCard(movie)}
                </div>
            </div>
        </div>
    )

    return (
        <CardEmpty
            movieName={movieName}
            onAddMovieToCard={() => onAddMovieToCard && onAddMovieToCard()}
            onRenameCard={(val: string) => onRenameCard && onRenameCard(val)}
            onDeleteCard={() => onDeleteCard && onDeleteCard()}
        />
    )
}