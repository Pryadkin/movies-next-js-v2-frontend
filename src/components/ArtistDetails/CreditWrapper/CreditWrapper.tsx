import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'

import {Credit} from '../Credit'

import styles from './CreditWrapper.module.scss'

interface Props {
    cast: ICorrectMovieWithoutLang[],
    crew: ICorrectMovieWithoutLang[],
    isCreditCastShow: boolean,
    isCreditCrewShow: boolean,
}

export const CreditWrapper = ({
    cast,
    crew,
    isCreditCastShow,
    isCreditCrewShow
}: Props) => {
    return (
        <>
            {isCreditCastShow ? <h2>Cast</h2> : isCreditCrewShow && <h2>Crew</h2>}
            {cast && (
                <div
                    className={styles.creditsWrapper}
                    style={{
                        display: isCreditCastShow ? 'grid' : 'none',
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
                        display: isCreditCrewShow ? 'grid' : 'none',
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
        </>
    )
}