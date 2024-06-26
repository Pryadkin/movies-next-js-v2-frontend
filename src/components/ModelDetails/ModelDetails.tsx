import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Popconfirm,
} from 'antd'
import clsx from 'classnames'
import {useRouter} from 'next/router'

import {IDetailsMovie} from '@/api/apiTypes'
import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {useFetchCredits} from '@/hooks/useFetchCredits'

import styles from './ModelDetails.module.scss'

import {setModelContent} from '@/redux/reducers'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {TMovieType} from '@/types'
import {ChartElement} from '@/ui-kit'

import {Spin} from '../Spin'

interface Props {
    movie: IMovie,
    isModalOpen?: boolean,
    onModalCancel?: () => void,
}

export const ModelDetails = ({
    movie,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const {push} = useRouter()
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const movieType: TMovieType = movie?.settings?.isTv ? 'tv' : 'movie'
    const {mutationDelete} = useDeleteMovie()

    const {
        data: credits,
    } = useFetchCredits(movie?.id, movie?.settings?.isTv, lang)

    const handleMoviePageClick = () => {
        push(`/movies/${movieType}/${movie.id}`)
        onModalCancel && onModalCancel()
    }

    const getPage = (movie: IDetailsMovie) => {
        if (movie) {
            const vote = Math.round(movie.vote_average * 10)

            return (
                <>
                    <div className={styles.poster}>
                        <img
                            src={movie.poster_path}
                            alt="poster_path"
                            style={{
                                borderRadius: 8,
                                boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.75)'
                            }}
                        />
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

                        <Button
                            style={{
                                position: 'absolute',
                                top: -10,
                                right: 40,
                            }}
                            type="link"
                            onClick={handleMoviePageClick}
                        >
                            Перейти на страницу фильма
                        </Button>

                        <div className={styles.movieDataElem}>
                            Сеть: {movie?.networks?.map(elem => {
                                return (
                                    <span key={elem.id}>{elem.name}</span>
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
                            Страна производитель: {movie.production_countries.map(elem => {
                                return (
                                    <span key={elem.name}>{elem.name}</span>
                                )
                            })}
                        </div>

                        <div className={styles.movieDataElem}>
                            Доход: {movie.revenue}
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
                                        key={elem.name}
                                    >
                                        {elem.english_name}
                                    </div>
                                )
                            })}
                        </div>

                        <div className={styles.movieDataElem}>
                            Жанр: {movie.genres.map(elem => {
                                return (
                                    <div
                                        style={{marginLeft: 30, color: 'grey'}}
                                        key={elem.id}>{elem.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )
        }
    }
    const [isCreditShow, setIsCreditShow] = useState(false)

    const handleShowCreditsClick = () => () => {
        const setCreditsShow = () => {
            credits && isCreditShow
                ? setIsCreditShow(false)
                : setIsCreditShow(true)
        }

        setCreditsShow()
    }

    const handleModalCancel = () => {
        onModalCancel && onModalCancel()
        setIsCreditShow(false)
    }

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
        push('/movies')
    }

    return (
        <Modal
            className={styles.modalContainer}
            open={isModalOpen}
            onCancel={handleModalCancel}
            footer={[]}
        >
            <div
                className={styles.wrapper}
                style={{
                    position: 'relative',
                    zIndex: 100
                }}
            >
                {movie
                    ? (
                        getPage(movie)
                    )
                    : (
                        <Spin />
                    )
                }
            </div>

            <div style={{display: 'flex'}}>
                <Button
                    type="default"
                    style={{zIndex: 100}}
                    className={styles.btn}
                    onClick={handleShowCreditsClick()}
                >
                    Show credits
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
            </div>

            <div
                className={styles.creditWrapper}
                style={{height: isCreditShow ? 1000 : 0}}
            >
                {credits && credits.cast.map(credit => (
                    <div
                        key={credit.id}
                        style={{zIndex: 100}}
                        className={styles.creditItem}
                        onClick={() => {
                            dispatch(setModelContent({
                                type: 'artist',
                                id: credit.id
                            }))
                        }}
                    >
                        <img
                            src={credit.profile_path}
                            alt={credit.name}
                        />
                        <h3>{credit.name}</h3>
                    </div>
                ))}
            </div>

            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(${movie?.backdrop_path})`,
                    position: 'absolute',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                    opacity: '0.2',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
        </Modal>
    )
}
