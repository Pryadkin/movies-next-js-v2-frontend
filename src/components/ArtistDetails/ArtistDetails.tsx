import {useState} from 'react'
import {useDispatch} from 'react-redux'

import {Button} from 'antd'

import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {IArtistDetails} from '@/api/apiTypes/responseArtistDetails'
import {setIsAddPersonModalOpen} from '@/redux/reducers'
import {ChartElement} from '@/ui-kit'

import styles from './ArtistDetails.module.scss'

import {CreditWrapper} from './CreditWrapper'

interface Props {
    artist: IArtistDetails,
    cast: ICorrectMovieWithoutLang[] | null,
    crew: ICorrectMovieWithoutLang[] | null,
}
export const ArtistDetails = ({
    artist,
    cast,
    crew
}: Props) => {
    const dispatch = useDispatch()
    const popularity = Math.round(artist.popularity)

    const [isCreditCastShow, setIsCreditCastShow] = useState(false)
    const [isCreditCrewShow, setIsCreditCrewShow] = useState(false)

    const sortByPopularityCast = cast && [...cast].sort((a, b) => b.popularity - a.popularity)

    const handleOpenAddPersonModel = () => {
        dispatch(setIsAddPersonModalOpen(true))
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img
                    className={styles.img}
                    src={artist.profile_path}
                    alt={artist.name}
                />

                <div className={styles.contant}>
                    <h1>{artist.name}</h1>

                    <div className={styles.subElem}>
                        <span className={styles.subTitle}>Place of birth:</span>
                        <span>{artist.place_of_birth}</span>
                    </div>
                    <div className={styles.subElem}>
                        <span className={styles.subTitle}>Birthday:</span>
                        <span>{artist.birthday}</span>
                    </div>
                    {artist.deathday && (
                        <div className={styles.subElem}>
                            <span className={styles.subTitle}>Deathday:</span>
                            <span>{artist.deathday}</span>
                        </div>
                    )}

                    <ChartElement
                        className={styles.popularity}
                        vote={popularity}
                        size={100}
                        data={[
                            {
                                num: popularity,
                                color: '#ff5757'
                            },
                            {
                                num: 100 - popularity,
                                color: '#ff9494'
                            }
                        ]}
                    />

                    <h3>Biography</h3>
                    <div>{artist.biography}</div>
                </div>
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
                    Credits cast
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
                    Credits crew
                </Button>

                <Button
                    className={styles.btn}
                    onClick={handleOpenAddPersonModel}
                >
                    add person
                </Button>
            </div>

            {sortByPopularityCast && crew && (
                <CreditWrapper
                    cast={sortByPopularityCast}
                    crew={crew}
                    isCreditCastShow={isCreditCastShow}
                    isCreditCrewShow={isCreditCrewShow}
                />
            )}
        </div>
    )
}