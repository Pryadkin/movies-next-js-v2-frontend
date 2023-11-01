import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Spin,
} from 'antd'
import clsx from 'clsx'

import {IDetailsMovie, IMovieLang} from '@/api/apiTypes'
import {useFetchDetailsMovie} from '@/hooks/useFetchDetailsMovie'
import {getIsDrawerMovieTagsOpen, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'

import styles from './ModelDetails.module.scss'

import {useAppDispatch} from '@/redux/store'
import {ChartElement} from '@/ui-kit'


interface Props {
    movie: IMovieLang,
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelDetails = ({
    movie,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const dispatch = useAppDispatch()
    const posterRef = useRef<HTMLImageElement>(null)
    const lang = useSelector(getSelectLanguage)
    const [movieImg, setMovieImg] = useState('')

    const {
        data,
        isFetching
    } = useFetchDetailsMovie(movie?.id, lang, movie?.settings?.isTv)

    useEffect(() => {
        data && setMovieImg(data?.poster_path)
    }, [data])

    const handleFilterBtnClick = (movieId: number) => () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        dispatch(setSelectMovie(movieId))
    }

    const [isImgShow, setImgShow] = useState<boolean>(false)

    const handleDetailsClose = () => {
        setMovieImg('')
        onModalCancel()
    }

    useEffect(() => {
        if (!posterRef.current) return

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0].contentBoxSize[0].blockSize < 100) {
                setImgShow(false)
            } else {
                setImgShow(true)
            }
        })
        resizeObserver.observe(posterRef.current)
        return () => {
            resizeObserver.disconnect()
        }
    }, [movieImg])

    const getPage = (movie: IDetailsMovie) => {
        if (movie) {
            const vote = Math.round(movie.vote_average * 10)

            return (
                <>
                    <div className={styles.poster}>
                        {!isImgShow && (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Spin/>
                            </div>
                        )}

                        <div
                            ref={posterRef}
                            className="imageWrapper"
                        >
                            <img
                                src={movieImg}
                                alt="poster_path"
                            />
                        </div>

                        <Button
                            type="default"
                            className={clsx(styles.btn, styles.btnFilter)}
                            onClick={handleFilterBtnClick(movie.id)}
                        >
                            SETTINGS
                        </Button>
                    </div>
                    <div className={styles.content}>
                        <h2>{movie.title}</h2>
                        <h3 className={styles.movieDataElem}>
                            {movie.tagline}
                        </h3>

                        <ChartElement
                            vote={vote}
                            size={100}
                            data={[
                                {
                                    num: vote,
                                    color: 'green'
                                },
                                {
                                    num: 100 - vote,
                                    color: 'black'
                                }
                            ]}
                        />

                        <div className={styles.info}>
                            <div className={styles.movieDataElem}>
                            Сеть: {movie?.networks?.map(elem => {
                                    return (
                                        <span key={elem.name}>{elem.name}</span>
                                    )
                                })}
                            </div>

                            <div className={styles.movieDataElem}>
                                {movie.overview}
                            </div>

                            {movie.seasons && (
                                <ol className={styles.movieDataElem}>
                                Сезоны: {movie.seasons.map(elem => {
                                        return (
                                            <li
                                                key={elem.id} className="item">
                                                <div
                                                    style={{marginLeft: 30, color: 'grey'}}
                                                >

                                                    Название: {elem.name}
                                                </div>
                                                <div
                                                    style={{marginLeft: 30, color: 'grey'}}
                                                >

                                                    Дата релиза: {elem.air_date}
                                                </div>
                                                <div
                                                    style={{marginLeft: 30, color: 'grey'}}

                                                >
                                                Кол-во эпизодов: {elem.episode_count}
                                                </div>
                                                <br />
                                            </li>

                                        )
                                    })}
                                </ol>
                            )}

                            <div className={styles.movieDataElem}>
                                Дата релиза: {movie.release_date}
                            </div>

                            <div className={styles.movieDataElem}>
                                Доход: {movie.revenue}
                            </div>

                            <div className={styles.movieDataElem}>
                                Страна производитель: {movie.production_countries.map(elem => {
                                    return (
                                        <span key={elem.iso_3166_1}>{elem.name}</span>
                                    )
                                })}
                            </div>

                            <div className={styles.movieDataElem}>
                                Продолжительность: {movie.runtime} мин
                            </div>

                            <div className={styles.movieDataElem}>
                                Бюджет: {movie.budget}
                            </div>

                            <div className={styles.movieDataElem}>
                                Статус: {movie.status}
                            </div>

                            <div className={styles.movieDataElem}>
                                Языки перевода: {movie.spoken_languages.map(elem => {
                                    return (
                                        <div
                                            style={{marginLeft: 30, color: 'grey'}}
                                            key={elem.name}>{elem.english_name}</div>
                                    )
                                })}
                            </div>

                            <div className={styles.movieDataElem}>
                                Жанр: {movie.genres.map(elem => {
                                    return (
                                        <div
                                            style={{marginLeft: 30, color: 'grey'}}
                                            key={elem.id}>{elem.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <Modal
            className={styles.modalContainer}
            open={isModalOpen}
            onCancel={handleDetailsClose}
            footer={[]}
        >
            <div
                className={styles.wrapper}
            >
                {data
                    ? (
                        getPage(data)
                    )
                    : (
                        <Spin />
                    )
                }
                <div
                    className={styles.background}
                    style={{
                        backgroundImage: `url(${data?.backdrop_path})`,
                    }}
                />
            </div>
        </Modal>
    )
}
