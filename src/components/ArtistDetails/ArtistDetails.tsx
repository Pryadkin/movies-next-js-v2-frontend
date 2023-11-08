import {useState} from 'react'

import {Button} from 'antd'

import {IMultiMovie} from '@/api/apiTypes/requestMovies'
import {IArtistDetails} from '@/api/apiTypes/responseArtistDetails'
import {ChartElement} from '@/ui-kit'

import styles from './ArtistDetails.module.scss'

import {Credit} from './Credit'

interface Props {
    artist: IArtistDetails,
    cast: IMultiMovie[] | null | undefined,
    crew: IMultiMovie[] | null | undefined,
}
export const ArtistDetails = ({
    artist,
    cast,
    crew
}: Props) => {
    const popularity = Math.round(artist.popularity)

    const [isCreditCastShow, setIsCreditCastShow] = useState(false)
    const [isCreditCrewShow, setIsCreditCrewShow] = useState(false)

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
            </div>

            {isCreditCastShow ? <h2>Cast</h2> : isCreditCrewShow && <h2>Crew</h2>}
            {cast && (
                <div
                    className={styles.creditsWrapper}
                    style={{
                        display: isCreditCastShow ? 'flex' : 'none',
                        marginBottom: 50
                    }}
                >
                    {cast.map(credit => (
                        <Credit
                            key={credit.id}
                            credit={credit}
                        />
                    ))}
                </div>
            )}

            {crew && (
                <div
                    className={styles.creditsWrapper}
                    style={{
                        display: isCreditCrewShow ? 'flex' : 'none',
                    }}
                >
                    {crew.map(credit => (
                        <Credit
                            key={credit.id}
                            credit={credit}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}