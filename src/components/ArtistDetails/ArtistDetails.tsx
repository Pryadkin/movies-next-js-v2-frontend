import {IArtistDetails} from '@/api/apiTypes/responseArtistDetails'
import {ChartElement} from '@/ui-kit'

import styles from './ArtistDetails.module.scss'

interface Props {
    artist: IArtistDetails,
}
export const ArtistDetails = ({
    artist
}: Props) => {
    const popularity = Math.round(artist.popularity)

    return (
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




                <div>{}</div>
            </div>


        </div>
    )
}