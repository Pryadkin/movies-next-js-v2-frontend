import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
} from 'antd'

import {IDetailsMovie} from '@/api/apiTypes'
import {getCorrectPrice} from '@/helpers'
import {useFetchCredits} from '@/hooks/useFetchCredits'
import {setIsAddMovieModalOpen, setModelContent} from '@/redux/reducers'

import styles from './MovieDetails.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {ChartElement} from '@/ui-kit'

import {Spin} from '../Spin'

interface Props {
    movie: IDetailsMovie,
}

export const MovieDetails = ({
    movie,
}: Props) => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)

    const {
        data: credits,
    } = useFetchCredits(movie.id, !!movie.first_air_date, lang)

    const directing = credits?.crew.find(elem => elem.known_for_department === "Directing" && elem.profile_path)

    const [isCreditCastShow, setIsCreditCastShow] = useState(false)
    const [isCreditCrewShow, setIsCreditCrewShow] = useState(false)

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
                                    <span key={elem.name}>{elem.name}</span>
                                )
                            })}
                        </div>

                        <div className={styles.movieDataElem}>
                            Доход: {getCorrectPrice(movie.revenue)}
                        </div>

                        <div className={styles.movieDataElem}>
                            Продолжительность: {movie.runtime} мин
                        </div>

                        <div className={styles.movieDataElem}>
                            Бюджет: {getCorrectPrice(movie.budget)}
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

                        <div
                            onClick={() => {
                                directing && dispatch(setModelContent({
                                    type: 'artist',
                                    id: directing.id
                                }))
                            }}
                            style={{
                                cursor: 'pointer',
                                overflowX: 'scroll',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: 10,
                                position: 'absolute',
                                top: 45,
                                right: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                width={80}
                                src={directing?.profile_path}
                                alt={directing?.name}
                            />
                            <div>{directing?.name}</div>
                        </div>
                    </div>
                </>
            )
        }
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
                    onClick={() => {
                        setIsCreditCastShow(!isCreditCastShow)
                        setIsCreditCrewShow(false)
                    }}
                >
                    Show credits cast
                </Button>
                <Button
                    type="default"
                    style={{zIndex: 100}}
                    className={styles.btn}
                    onClick={() => {
                        setIsCreditCastShow(false)
                        setIsCreditCrewShow(!isCreditCrewShow)
                    }}
                >
                    Show credits crew
                </Button>

                <Button
                    type="default"
                    className={styles.btn}
                    style={{zIndex: 100}}
                    onClick={() => dispatch(setIsAddMovieModalOpen(true))}
                >
                    add
                </Button>
            </div>

            {isCreditCastShow ? <h2>Cast</h2> : isCreditCrewShow && <h2>Crew</h2>}
            <div
                className={styles.creditWrapper}
                style={{
                    height: isCreditCastShow ? 1000 : 0,
                }}
            >
                {credits && credits.cast.map(credit => (
                    <div
                        key={credit.credit_id}
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
                        <div>
                            <h3>{credit.name}</h3>
                            <div>{credit.known_for_department}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className={styles.creditWrapper}
                style={{
                    height: isCreditCrewShow ? 1000 : 0,
                }}
            >
                {credits && credits.crew.map(credit => (
                    <div
                        key={credit.credit_id}
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
                        <div>
                            <h3>{credit.name}</h3>
                            <div>{credit.known_for_department}</div>
                        </div>
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
        </>
    )
}
