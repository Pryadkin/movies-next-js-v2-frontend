import {useSelector} from "react-redux"

import {IDetailsMovie} from "@/api/apiTypes"
import {getCorrectPrice} from "@/helpers"
import {useFetchCredits} from "@/hooks/useFetchCredits"
import {setModelContent} from "@/redux/reducers"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {useAppDispatch} from "@/redux/store"

import styles from './DescriptionPage.module.scss'

import {ChartElement} from "@/ui-kit"


export const DescriptionPage = ({movie}: {movie: IDetailsMovie}) => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const {
        data: credits,
    } = useFetchCredits(movie.id, !!movie.first_air_date, lang)

    const directing = credits?.crew.find(elem => elem.known_for_department === "Directing" && elem.profile_path)

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