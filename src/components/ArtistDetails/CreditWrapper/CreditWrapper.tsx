import {useState} from 'react'

import {Select} from 'antd'

import {ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'

import {Credit} from '../Credit'

import styles from './CreditWrapper.module.scss'

import {TSortValue, filterOptions, sortOptions} from './helpers'
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
    const [selectSortValue, setSelectSortValue] = useState<TSortValue>('default')
    const [selectFilterValue, setSelectFilterValue] = useState<number[]>([
        99, 10762, 10763, 10764, 10765, 10766, 10767, 10768
    ])

    const getSelecSorttOptions = (opt: string[]) => {
        return opt.map(elem => ({
            label: elem,
            value: elem,
        }))
    }

    const getSelectFilterOptions = (opt: {genreId: number, name: string}[]) => {
        return opt.map(elem => ({
            label: elem.name,
            value: elem.genreId,
        }))
    }

    const sortMovie = selectSortValue === 'default'
        ? cast
        : [...cast].sort((a, b) => b[selectSortValue] - a[selectSortValue])

    const getFilterMovie = (val: number[]) => {
        return val?.length !== 0
            ? val.reduce((sum: ICorrectMovieWithoutLang[], item) => {
                const filt = sum.filter(elem => !elem.genre_ids.includes(item))
                return filt
            }, sortMovie)
            : sortMovie
    }

    const filterMovie = getFilterMovie(selectFilterValue)

    return (
        <>
            {isCreditCastShow
                ? <h2>Cast</h2>
                : isCreditCrewShow && <h2>Crew</h2>
            }

            {isCreditCastShow && (
                <>
                    <div className={styles.selectWrapper}>
                        <Select
                            className={styles.leftSelect}
                            value={selectSortValue}
                            options={getSelecSorttOptions(sortOptions)}
                            placeholder={'sort'}
                            onChange={setSelectSortValue}
                        />
                        <Select
                            className={styles.rightSelect}
                            value={selectFilterValue}
                            mode='multiple'
                            options={getSelectFilterOptions(filterOptions)}
                            placeholder={'filter'}
                            onChange={setSelectFilterValue}
                        />
                    </div>

                    <div
                        className={styles.creditsWrapper}
                        style={{
                            display: isCreditCastShow ? 'grid' : 'none',
                            marginBottom: 50
                        }}
                    >
                        {filterMovie
                            .map(credit => (
                                <Credit
                                    key={credit.id}
                                    credit={credit}
                                />
                            ))}
                    </div>
                </>
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