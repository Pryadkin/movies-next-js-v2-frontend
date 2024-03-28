import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button, Popconfirm,
} from 'antd'

import {IDetailsMovie} from '@/api/apiTypes'
import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {useFetchCredits} from '@/hooks/useFetchCredits'
import {getIsDrawerMovieTagsOpen, setModelContent} from '@/redux/reducers'

import styles from './MovieDetails.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

import {Spin} from '../Spin'

import {DescriptionPage} from './DescriptionPage'


interface Props {
    movie: IDetailsMovie,
    onModalShow: (val: boolean) => void,
}

export const MovieDetails = ({
    movie,
    onModalShow
}: Props) => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const {mutationDelete} = useDeleteMovie()

    const {
        data: credits,
    } = useFetchCredits(movie.id, !!movie.first_air_date, lang)

    const [isCreditCastShow, setIsCreditCastShow] = useState(false)
    const [isCreditCrewShow, setIsCreditCrewShow] = useState(false)

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
        onModalShow(false)
    }

    const handleFilterBtnClick = () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        onModalShow(false)
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
                        <DescriptionPage movie={movie} />
                    )
                    : (
                        <Spin />
                    )
                }
            </div>

            <div className={styles.btnsWrapper}>
                <Button
                    type="default"
                    className={styles.btn}
                    onClick={() => {
                        setIsCreditCastShow(!isCreditCastShow)
                        setIsCreditCrewShow(false)
                    }}
                >
                    Credits cast
                </Button>
                <Button
                    type="default"
                    className={styles.btn}
                    onClick={() => {
                        setIsCreditCastShow(false)
                        setIsCreditCrewShow(!isCreditCrewShow)
                    }}
                >
                    Credits crew
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
                        className={styles.btn}
                    >
                        remove
                    </Button>
                </Popconfirm>

                <Button
                    className={styles.btn}
                    onClick={handleFilterBtnClick}
                >
                    settings
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
