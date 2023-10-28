import React from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
} from 'antd'
import clsx from 'clsx'

import {IDetailsMovie, IMovieLang} from '@/api/apiTypes'
import {useFetchDetailsMovie} from '@/hooks/useFetchDetailsMovie'
import {getIsDrawerMovieTagsOpen, setSelectMovie} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'

import styles from './ModelDetails.module.scss'

import {useAppDispatch} from '@/redux/store'
import {ChartElement} from '@/ui-kit'


import {Spin} from '../Spin'


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
    const lang = useSelector(getSelectLanguage)

    const {
        data,
        isFetching
    } = useFetchDetailsMovie(movie?.id, lang, movie?.settings?.isTv)

    const handleFilterBtnClick = (movieId: number) => () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        dispatch(setSelectMovie(movieId))
    }

    const getPage = (movie: IDetailsMovie) => {
        if (movie) {
            const vote = Math.round(movie.vote_average * 10)

            return (
                <>
                    <div className={styles.poster}>
                        <img src={movie.poster_path} alt="poster_path" />
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
            onCancel={onModalCancel}
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
