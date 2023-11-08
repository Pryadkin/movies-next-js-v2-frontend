import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
} from 'antd'
import {useRouter} from 'next/router'

import {IDetailsMovie, IMovie} from '@/api/apiTypes'
import {useFetchCredits} from '@/hooks/useFetchCredits'
import {useFetchDetailsMovie} from '@/hooks/useFetchDetailsMovie'
import {setArtistToModelContent, setIsAddMovieModalOpen, setMovieToModelContent} from '@/redux/reducers'

import styles from './MovieDetails.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {ChartElement} from '@/ui-kit'

import {Spin} from '../Spin'

interface Props {
    movie: IMovie,
}

export const MovieDetails = ({
    movie,
}: Props) => {
    const {asPath} = useRouter()
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)

    const {
        data,
    } = useFetchDetailsMovie(movie?.id, lang, movie?.settings?.isTv)
    const {
        data: credits,
    } = useFetchCredits(movie?.id, movie?.settings?.isTv, lang)

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
                            Страна производитель: {movie.production_countries.map(elem => {
                                return (
                                    <span key={elem.iso_3166_1}>{elem.name}</span>
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
                                        key={elem.id}>{elem.name}</div>
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

    return (
        <>
            <div
                className={styles.wrapper}
                style={{
                    position: 'relative',
                    zIndex: 100
                }}
            >
                {data
                    ? (
                        getPage(data)
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

                {asPath !== '/movies' && (
                    <Button
                        type="default"
                        className={styles.btn}
                        style={{zIndex: 100}}
                        onClick={() => dispatch(setIsAddMovieModalOpen(true))}
                    >
                        add
                    </Button>
                )}

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
                            dispatch(setMovieToModelContent(null))
                            dispatch(setArtistToModelContent(credit.id))
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
                    backgroundImage: `url(${data?.backdrop_path})`,
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
        </>
    )
}
